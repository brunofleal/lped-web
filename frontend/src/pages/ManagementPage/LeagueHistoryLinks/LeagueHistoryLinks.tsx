import { Box, Link as ChakraLink, Text, useToast, VStack } from '@chakra-ui/react';
import { Method } from 'axios';
import React from 'react';

import endpoints from '../../../constants/endpoints';
import useFetch from '../../../hooks/Fetch';
import { retrieveToken } from '../../../hooks/token';
import { PlayerModel } from '../../../models/PlayerModel';

const LeagueHistoryLinks = () => {
    const toast = useToast();
    const steamId3 = retrieveToken();
    const seasonTicketIds = ['15842'];

    const getStratzLink = (seasonId: number) => {
        const linkTemplate = {
            base: 'https://stratz.com/players/$dotaId$?leagueId=$tid$',
            ticketIdKey: '$tid$',
            dotaIdKey: '$dotaId$',
        };
        return linkTemplate.base
            .replace(linkTemplate.dotaIdKey, steamId3)
            .replace(linkTemplate.ticketIdKey, seasonTicketIds[seasonId] ?? 0);
    };

    const { data: savedPlayerModel } = useFetch<PlayerModel>({
        axiosConfig: {
            url: steamId3 ?
                endpoints.player.getOne.path.replace(endpoints.player.getOne.pathParam.dotaId, steamId3) : '',
            method: endpoints.player.getOne.method as Method,
        },
        onError: () => toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' }),
    });
    const seasons = savedPlayerModel && savedPlayerModel.seasons ? savedPlayerModel.seasons : [].sort();

    return <Box alignContent='start'>
        <Text fontSize={'lg'} fontWeight={'bold'} color='blue.700'>Histórico:</Text>
        <VStack align={'flex-start'} ml={4} gap={0}>
            {(seasons).map((seasonId: number) => {
                return <ChakraLink display='list-item' color='teal.500' key={'st' + seasonId}
                    href={getStratzLink(seasonId)}
                    isExternal={true}>
                    {`Partidas jogadas na ${seasonId + 1}ª temporada`}
                </ChakraLink>;
            })}
        </VStack>
    </Box>;
};

export default LeagueHistoryLinks;
