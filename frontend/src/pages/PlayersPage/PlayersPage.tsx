import { Box, Text, useToast } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { PlayerModel } from '../../models/PlayerModel';
import axiosApi from '../../shared/axiosApi';
import PlayersTable from './PlayersTable';

const PlayersPage = () => {
    const toast = useToast();
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const getConfig: AxiosRequestConfig = {
        url: endpoints.player.list.path,
        method: endpoints.player.list.method,
    };

    useEffect(() => {
        axiosApi.request(getConfig).then((response) => {
            if (response.status === 200) {
                setPlayers(response.data.results);
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro na listagem de jogadores', position: 'top' });
        });
    }, []);

    return <>
        <Text>Players Page</Text>
        <Box w={'800px'} h={'60vh'} border='solid 2px black'>
            <PlayersTable players={players} />
        </Box>
    </>;
};

export default PlayersPage;
