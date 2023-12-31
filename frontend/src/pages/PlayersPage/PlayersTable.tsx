import {
    HStack, Icon,
    Image, Link as ChakraLink,
    Table, TableContainer, Tbody,
    Td, Text, Th, Thead, Tr,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import Medal from '../../components/Medal/Medal';
import TierBadge from '../../components/TierBadge/TierBadge';
import endpoints from '../../constants/endpoints';
import { isAuthTokenValid } from '../../hooks/auth';
import useFetch from '../../hooks/Fetch';
import { getValidPlayerName } from '../../hooks/playerUtils';
import { PlayerModel } from '../../models/PlayerModel';
import routes from '../../shared/routes';
import DotaPosBadge from './components/DotaPosBadge';
import PlayerLinks from './components/PlayerLinks';
import SeasonFunction from './components/SeasonFunction';


interface PlayerTableProps {
    players?: PlayerModel[];
    playerIds?: Number[];
    captainDotaId?: Number;
    tableColor?: string;
    useMaxWidth?: boolean;
}
const PlayersTable = ({ players, playerIds, captainDotaId, tableColor, useMaxWidth }: PlayerTableProps) => {
    const [playersInfo, setPlayerInfo] = useState<PlayerModel[]>([]);

    const playersWithDetails = playersInfo ? playersInfo.map((player, index) => {
        return <PlayerRow
            playerInfo={player} isCaptain={player.dotaId === captainDotaId}
            key={Math.random() + index}
        />;
    }) : [];

    const queryParam = playerIds && !players ? `&dotaId=${playerIds.join('&dotaId=')}` : '';
    const listFilteredPlayersConfig: AxiosRequestConfig = {
        url: `${endpoints.player.list.path}${queryParam}`,
        method: endpoints.player.list.method,
    };
    const { data: playersFetched } = useFetch<PlayerModel[]>({
        axiosConfig: listFilteredPlayersConfig,
        onError: () => {
        },
    });
    useEffect(() => {
        if (players) {
            setPlayerInfo(players);
        } else if (playersFetched) {
            setPlayerInfo(playersFetched);
        }
    }, [players, playerIds, playersFetched]);

    return <TableContainer maxWidth={useMaxWidth ? 'auto' : '750px'} h={'inherit'} overflowY="auto">
        <Table variant='striped' colorScheme={tableColor}>
            <Thead position={'sticky'}>
                <Tr>
                    <Th>
                        <Icon as={BiUserCircle} width={'32px'} height={'32px'} />
                    </Th>
                    <Th>Dota Id</Th>
                    <Th>Nome</Th>
                    <Th>Posições</Th>
                    <Th>Medalha</Th>
                    <Th>Tier</Th>
                    <Th>Categoria</Th>
                    <Th>Links</Th>
                    {isAuthTokenValid() ? <Th>Edit</Th> : <></>}
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
            <Image
                h='50px'
                objectFit='contain'
                borderRadius={'lg'}
                src={playerInfo.stratzApi.steamAccount.avatar}
                fallback={<Icon as={BiUserCircle} />}
                loading="lazy"
            />
        </Td>
        <Td>
            <ChakraLink href={`https://stratz.com/players/${String(playerInfo?.dotaId)}`} isExternal={true}>
                {playerInfo.dotaId}
            </ChakraLink>
        </Td>
        <Td>
            <Text fontWeight={isCaptain ? 'bold' : 'normal'}>{isCaptain ? '[C]' : <></>}
                {getValidPlayerName(playerInfo)}
            </Text>
        </Td>
        <Td>
            <HStack>
                <DotaPosBadge isPrimary={true} roleId={playerInfo.positionPrefs ? playerInfo.positionPrefs[0] : 0} />
                <DotaPosBadge roleId={playerInfo.positionPrefs ? playerInfo.positionPrefs[1] : 0} />
            </HStack>
        </Td>
        <Td>
            <Medal fullRank={playerInfo.stratzApi.steamAccount.seasonRank ?
                Number(playerInfo.stratzApi.steamAccount.seasonRank) : 0} />
        </Td>
        <Td>
            <TierBadge tier={playerInfo?.tier ? playerInfo?.tier : 0} />
        </Td>
        <Td>
            <SeasonFunction type={playerInfo.playerClass ? playerInfo.playerClass : undefined} />
        </Td>
        <Td>
            <PlayerLinks player={playerInfo} />
        </Td>
        {isAuthTokenValid() ? <Td>
            <Link
                to={
                    routes.EditPlayerPage.path.replace(routes.EditPlayerPage.pathParam.id,
                        String(playerInfo.dotaId))
                }
            >
                <BsFillPencilFill />
            </Link>
        </Td> : <></>}

    </Tr>;
};

export default PlayersTable;
