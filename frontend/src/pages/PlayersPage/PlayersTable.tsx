import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsStar } from 'react-icons/bs';

import endpoints from '../../constants/endpoints';
import { PlayerModel } from '../../models/PlayerModel';
import axiosApi from '../../shared/axiosApi';

interface PlayerTableProps {
    players?: PlayerModel[];
    playerIds?: Number[];
    captainDotaId?: Number;
}
const PlayersTable = ({ players, playerIds, captainDotaId }: PlayerTableProps) => {
    console.log({ playerIds, captainDotaId });
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
            const queryParam = `?dotaId=${playerIds.join('dotaId=')}`;
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

    return <TableContainer w={'inherit'} h={'inherit'} overflowY="scroll">
        <Table variant='striped' colorScheme='blue'>
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
    playerInfo?: PlayerModel;
    isCaptain?: boolean;
}
const PlayerRow = ({ playerInfo, isCaptain }: PlayerProps) => {
    const getValidName = () => {
        if (playerInfo?.stratzApi?.identity?.name) {
            return playerInfo?.stratzApi?.identity?.name;
        }
        if (playerInfo?.stratzApi?.names && playerInfo?.stratzApi?.names[0]?.name) {
            return playerInfo?.stratzApi?.names[0]?.name;
        } if (playerInfo?.stratzApi?.steamAccount?.name) {
            return playerInfo?.stratzApi?.steamAccount?.name;
        }
        if (playerInfo?.stratzApi?.identity?.name) {
            return playerInfo?.stratzApi?.identity?.name;
        }
    };
    return <Tr>
        <Td>{getValidName()}{isCaptain ? <BsStar /> : <></>}</Td>
        <Td>{String(playerInfo?.dotaId)}</Td>
    </Tr>;
};

export default PlayersTable;
