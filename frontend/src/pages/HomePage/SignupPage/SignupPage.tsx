import { Box, Divider, Text, useToast } from '@chakra-ui/react';
import { Method } from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { registerToken, retrieveToken } from '../../../hooks/token';

const SteamID = require('steamid');

import SteamLoginLogoutButton from '../../../components/SteamLoginLogout/SteamLoginLogoutButton';
import endpoints from '../../../constants/endpoints';
import useFetch from '../../../hooks/Fetch';
import { StratzApi } from '../../../models/PlayerModel';
import LeagueSignupForm from './LeagueSignupForm/LeagueSignupForm';

const SignupPage = () => {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const steamId3 = retrieveToken();


    const { data: stratzData, fetch: fetchStratzData } = useFetch<StratzApi>({
        axiosConfig: {
            url: endpoints.stratz.get.path.replace(endpoints.stratz.get.pathParam.id, steamId3),
            method: endpoints.stratz.get.method as Method,
        },
        controlFetch: true,
        onSuccess: () => toast({ status: 'success', title: 'Dados da steam carregados!', position: 'top' }),
        onError: () => toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' }),
    });


    useEffect(() => {
        if (searchParams.size > 0) {
            const openIdParams = Object.fromEntries(searchParams);
            if (openIdParams && openIdParams['openid.identity']) {
                const steamId64 = openIdParams['openid.identity']
                    .slice(openIdParams['openid.identity']
                        .lastIndexOf('/') + 1);
                const sid = new SteamID(BigInt(steamId64));
                const steamId3Full = sid.getSteam3RenderedID();
                const steamId = steamId3Full.slice(steamId3Full.lastIndexOf(':') + 1, steamId3Full.length - 1);
                registerToken(String(steamId));
                setSearchParams([]);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (steamId3) {
            fetchStratzData();
        }
    }, [steamId3]);


    return <Box mt={8}>
        <SteamLoginLogoutButton />
        <Divider my={2} />

        {steamId3.length && stratzData ?
            <LeagueSignupForm stratzData={stratzData} /> :
            <Text fontSize='xl'>Entre com a steam para verificar sua inscrição</Text>
        }


    </Box>;
};

export default SignupPage;

