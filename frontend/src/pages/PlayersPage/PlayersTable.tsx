import {
    HStack, Icon, Image, Link as ChakraLink, Table,
    TableContainer, Tbody, Td, Text, Th, Thead, Tr,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillPencilFill, BsSteam } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import endpoints from '../../constants/endpoints';
import { isAuthTokenValid } from '../../hooks/auth';
import { getValidPlayerName } from '../../hooks/playerUtils';
import { PlayerModel } from '../../models/PlayerModel';
import axiosApi from '../../shared/axiosApi';
import routes from '../../shared/routes';

const stratzIconSrc = 'https://styles.redditmedia.com/t5_2l0u21/styles/communityIcon_6x27h20jket41.jpg';

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
                    <Th>
                        <Icon as={BiUserCircle} width={'32px'} height={'32px'} />
                    </Th>
                    <Th>Nome</Th>
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
            <Image h={'50px'} w={'50px'}
                src={playerInfo.stratzApi.steamAccount.avatar}
                fallback={<Icon as={BiUserCircle} />}
                loading="lazy"
            />
        </Td>
        <Td>
            <Text fontWeight={isCaptain ? 'bold' : 'normal'}>{isCaptain ? '[C]' : <></>}
                {getValidPlayerName(playerInfo)}
            </Text>
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

const PlayerLinks = ({ player }: { player: PlayerModel; }) => {
    return <HStack>
        <ChakraLink
            href={`https://stratz.com/players/${String(player?.dotaId)}`}
            isExternal={true}
        >
            <Image w={25} h={25}
                src={stratzIconSrc}
                borderRadius={'25%'}
                fallback={<Icon as={BiUserCircle} />}
                loading="lazy"
            />
        </ChakraLink>;
        <ChakraLink
            href={player.stratzApi.steamAccount.profileUri}
            isExternal={true}
        >
            <Icon as={BsSteam} w={25} h={25} borderRadius={'25%'} />
        </ChakraLink>
    </HStack>;
};

export default PlayersTable;
