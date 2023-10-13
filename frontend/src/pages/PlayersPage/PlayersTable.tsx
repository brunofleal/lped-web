import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { getValidPlayerName } from '../../hooks/playerUtils';
import { PlayerModel } from '../../models/PlayerModel';
import axiosApi from '../../shared/axiosApi';

interface PlayerTableProps {
    players?: PlayerModel[];
    playerIds?: Number[];
    captainDotaId?: Number;
    tableColor?: string;
}
const PlayersTable = ({ players, playerIds, captainDotaId, tableColor }: PlayerTableProps) => {
    const [playersInfo, setPlayerInfo] = useState<PlayerModel[]>([]);

    const playersWithDetails = playersInfo?.map((player, index) => {
        return <PlayerRow playerInfo={player} isCaptain={player.dotaId === captainDotaId} key={'k' + index} />;
    });

    useEffect(() => {
        if (players) {
            setPlayerInfo(players);
        }
    }, [players]);

    useEffect(() => {
        if (playerIds) {
            const queryParam = `?dotaId=${playerIds.join('&dotaId=')}`;
            const listFilteredPlayersConfig: AxiosRequestConfig = {
                url: `/api/player${queryParam}`,
                method: endpoints.player.list.method,
            };

            axiosApi.request(listFilteredPlayersConfig).then((response) => {
                if (response.status === 200) {
                    setPlayerInfo(response.data.results as PlayerModel[]);
                }
            });
        }
    }, [playerIds]);

    return <TableContainer w={'inherit'} h={'inherit'} overflowY="auto">
        <Table variant='striped' colorScheme={tableColor}>
            <Thead position={'sticky'}>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Dota Id</Th>
                </Tr>
            </Thead>
            <Tbody>
                {playersWithDetails}
            </Tbody>
        </Table>
    </TableContainer>;
};

interface PlayerProps {
    playerInfo: PlayerModel;
    isCaptain?: boolean;
}
const PlayerRow = ({ playerInfo, isCaptain }: PlayerProps) => {
    return <Tr>
        <Td>
            <Text fontWeight={isCaptain ? 'bold' : 'normal'}>{isCaptain ? '[C]' : <></>}
                {getValidPlayerName(playerInfo)}
            </Text>
        </Td>
        <Td>{String(playerInfo?.dotaId)}</Td>
    </Tr>;
};

export default PlayersTable;
