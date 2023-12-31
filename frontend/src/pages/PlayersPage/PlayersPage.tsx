import { Box, useToast } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useMemo } from 'react';

import endpoints from '../../constants/endpoints';
import useFetch from '../../hooks/Fetch';
import { PlayerModel } from '../../models/PlayerModel';
import PlayersTable from './PlayersTable';

const PlayersPage = () => {
    const toast = useToast();

    const { data: seasonData } =
        useFetch<{ currentSeason: number; }>({ axiosConfig: { url: endpoints.season.get.path, method: 'GET' } });
    const currentSeason = seasonData ? seasonData.currentSeason : 0;

    const listPlayersInSeasonConfig: AxiosRequestConfig = {
        url: endpoints.player.list.path,
        method: endpoints.player.list.method,
    };
    const { data: players } = useFetch<PlayerModel[]>({
        axiosConfig: listPlayersInSeasonConfig,
        onError: () => {
            toast({ status: 'error', title: 'Erro na listagem de jogadores', position: 'top' });
        },
    });
    const playersInCurrentSeason: PlayerModel[] = useMemo(() => {
        if (!players) {
            return [];
        }
        return players.filter((player) => {
            return player.seasons?.includes(currentSeason);
        });
    }, [players]);


    return <Box mt={6} p={2}>
        <Box
            bgClip='text'
            fontSize='3xl'
            borderRadius='md'
            fontWeight='extrabold' bgGradient='linear(to-r, blue.500, gray.500)'>
            Jogadores({playersInCurrentSeason.length}) inscritos na {currentSeason + 1}ª temporada
        </Box>
        <Box w={'auto'} h={'60vh'} border='solid 2px black'>
            <PlayersTable players={playersInCurrentSeason} useMaxWidth={true} />
        </Box>
    </Box>;
};

export default PlayersPage;
