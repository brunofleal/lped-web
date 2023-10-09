import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { PlayerModel } from '../../models/PlayerModel';
import axiosApi from '../../shared/axiosApi';

const PlayersTable = () => {
    const toast = useToast();
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const getConfig: AxiosRequestConfig = {
        url: endpoints.player.add.path,
        method: endpoints.player.list.method,
    };

    useEffect(() => {
        axiosApi.request(getConfig).then((response) => {
            if (response.status === 200) {
                console.log(response);
                setPlayers(response.data.results);
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro na listagem de jogadores', position: 'top' });
        });
    }, []);
    return <TableContainer>
        <Table variant='simple' w={'auto'}>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Dota Id</Th>
                </Tr>
            </Thead>
            <Tbody>
                {players?.map((player) => {
                    return <PlayerRow key={'k' + player.dotaId} {...player} />;
                })}
            </Tbody>
        </Table>
    </TableContainer>;
};


const PlayerRow = (player: PlayerModel) => {
    return <Tr>
        <Td>{player.stratzApi.identity.name}</Td>
        <Td>{String(player.dotaId)}</Td>
    </Tr>;
};

export default PlayersTable;
