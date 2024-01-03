import {
    Badge, Box,
    FormLabel, Grid, GridItem,
    Image, Radio,
    RadioGroup, Stack,
    Text, useToast,
} from '@chakra-ui/react';
import { Method } from 'axios';
import React from 'react';

import endpoints from '../../constants/endpoints';
import useFetch from '../../hooks/Fetch';
import { retrieveToken } from '../../hooks/token';
import { PlayerType } from '../../models/Player/PlayerType';
import { PlayerModel } from '../../models/PlayerModel';
import RegisterStatus from '../../pages/HomePage/SignupPage/LeagueSignupForm/RegisterStatus';
import Medal from '../Medal/Medal';
import RoleSelect from '../RoleSelect/RoleSelect';

const COLORS = ['orange', 'green', 'blue', 'red', 'pink', 'yellow', 'purple', 'gray', 'cyan', 'whiteAlpha'];

const PlayerCard = () => {
    const toast = useToast();
    const steamId3 = retrieveToken();
    const styleSeed: number[] = steamId3 ? steamId3.slice(0, 3).split('').map((c) => Number(c)) : [];
    // eslint-disable-next-line max-len
    const gradientStyle = `linear(${COLORS[styleSeed[0]]}.200 0%, ${COLORS[styleSeed[1]]}.100 25%, ${COLORS[styleSeed[2]]}.50 50%)`;
    const textShadowStyle = `0 0 3px black, 0 0 2px ${COLORS[styleSeed[0]]}`;
    const { data: savedPlayerModel } = useFetch<PlayerModel>({
        axiosConfig: {
            url: steamId3 ?
                endpoints.player.getOne.path.replace(endpoints.player.getOne.pathParam.dotaId, steamId3) : '',
            method: endpoints.player.getOne.method as Method,
        },
        onError: () => toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' }),
    });

    const { data: seasonData } =
        useFetch<{ currentSeason: number; }>({ axiosConfig: { url: endpoints.season.get.path, method: 'GET' } });
    const currentSeason = seasonData ? seasonData.currentSeason : 0;
    const playerExistsInDb = !!savedPlayerModel;
    const playerRegisteredInSeason = playerExistsInDb && savedPlayerModel.seasons?.includes(currentSeason);
    return <Box minW='600px' w='50%'
        mt={1}
        bgGradient={gradientStyle}
        boxShadow='xl'
        borderRadius={'md'}
        color='.'
        p={1}>
        <RegisterStatus isRegisteredInSeason={!!playerRegisteredInSeason} />
        {!!playerRegisteredInSeason ?
            <Grid templateColumns='repeat(4, 2fr)' gap={3}>
                <GridItem colSpan={1}>
                    <FormLabel>Avatar</FormLabel>
                    <Image borderRadius='lg' src={savedPlayerModel?.stratzApi.steamAccount.avatar} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Nickname</FormLabel>
                    <Text fontSize='lg' fontStyle='oblique' fontWeight='bold' color='white'
                        textShadow={textShadowStyle}>
                        {savedPlayerModel?.name}
                    </Text>

                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Id do Dota</FormLabel>
                    <Text fontWeight='extrabold' >{steamId3}</Text>
                </GridItem>
                <GridItem colSpan={4}>
                    <FormLabel>
                        Participação no Campeonato
                    </FormLabel>
                    <RadioGroup value={savedPlayerModel?.playerClass} fontWeight='extrabold'>
                        <Stack direction='row'>
                            {(Object.entries(PlayerType).map(([label, value]) => ({ label, value })))
                                .filter(({ value }) => value === savedPlayerModel?.playerClass)
                                .map(({ label, value }) => {
                                    return <Radio key={label} value={value} >{label}</Radio>;
                                })}
                        </Stack>
                    </RadioGroup>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Medalha</FormLabel>
                    <Medal fullRank={Number(savedPlayerModel?.stratzApi?.steamAccount.seasonRank)} />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Tier</FormLabel>
                    <Badge borderRadius='lg' colorScheme='blue' variant='outline' fontSize='xl'>
                        {savedPlayerModel?.tier}
                    </Badge>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Descrição</FormLabel>
                    <Text borderRadius={'md'} border='solid 1px red' borderColor='gray.200' p={1}>
                        {String(savedPlayerModel?.selfDescription)}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Função Primária</FormLabel>
                    <RoleSelect
                        roleId={savedPlayerModel?.positionPrefs ? savedPlayerModel?.positionPrefs[0] : 0}
                        disabled={true} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Função Secundária</FormLabel>
                    <RoleSelect
                        roleId={savedPlayerModel?.positionPrefs ? savedPlayerModel?.positionPrefs[1] : 0}
                        disabled={true} />
                </GridItem>
            </Grid> :
            <></>
        }
    </Box >;
};

export default PlayerCard;
