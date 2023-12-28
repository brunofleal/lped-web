import { Box, Button, Divider, Icon, Skeleton, Text, useToast } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsSteam } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

import { clearToken, registerToken, retrieveToken } from '../../../shared/token';

const SteamID = require('steamid');

import endpoints from '../../../constants/endpoints';
import { StratzApi } from '../../../models/PlayerModel';
import axiosApi, { BASE_URL } from '../../../shared/axiosApi';
import LeagueSignupForm from './LeagueSignupForm/LeagueSignupForm';

const SignupPage = () => {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const [steamId3, setSteamId3] = useState('');
    const [stratzData, setStratzData] = useState<StratzApi>();
    const handleSteamLogin = () => {
        location.href = `${BASE_URL}${endpoints.steam.auth.path}`;
    };
    const handleLogout = () => {
        setSearchParams([]);
        setSteamId3('');
        clearToken();
    };

    const handleLoadStratzData = () => {
        const getConfig: AxiosRequestConfig = {
            url: endpoints.stratz.get.path.replace(endpoints.stratz.get.pathParam.id, steamId3),
            method: endpoints.stratz.get.method,
        };
        axiosApi.request(getConfig).then((response) => {
            if (response.status === 200) {
                setStratzData(response.data);
                toast({ status: 'success', title: 'Dados da steam carregados!', position: 'top' });
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' });
        });
    };

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
                setSteamId3(String(steamId));
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (steamId3) {
            handleLoadStratzData();
            registerToken(steamId3);
        }
    }, [steamId3]);

    useEffect(() => {
        const token = retrieveToken();
        if (token && token.length > 0) {
            setSteamId3(token);
        }
    }, []);

    return <Box mt={8}>
        {!steamId3.length ?
            <Button onClick={handleSteamLogin} bgColor='#c7d5e0'>
                <Text>Entre pela Steam</Text>
                <Icon ml={2} as={BsSteam} />
            </Button> :
            <Button onClick={handleLogout} bgColor='#1b2838' color='white'>
                <Text>Sair da Steam</Text>
                <Icon ml={2} as={BsSteam} />
            </Button>
        }
        <Divider my={2} />
        {steamId3.length ?
            <LeagueSignupForm stratzData={stratzData} /> :
            <Skeleton h='800px' maxW='lg' borderWidth='1px' borderRadius='lg' p={2} />
        }

    </Box>;
};

export default SignupPage;

