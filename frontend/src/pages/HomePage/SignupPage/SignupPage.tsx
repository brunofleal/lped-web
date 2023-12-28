import { Box, Button, Icon, Text, useToast } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsSteam } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

import endpoints from '../../../constants/endpoints';
import axiosApi, { BASE_URL } from '../../../shared/axiosApi';

const SignupPage = () => {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const [steamId, setSteamID] = useState(''); // Convert to STEAMID3(dota id) in order to work with stratz
    const [stratzData, setStratzData] = useState();
    const handleSteamLogin = () => {
        location.href = `${BASE_URL}${endpoints.steam.auth.path}`;
    };
    const handleLogout = () => {
        setSearchParams([]);
        setSteamID('');
    };

    const handleLoadStratzData = () => {
        const getConfig: AxiosRequestConfig = {
            url: endpoints.stratz.get.path.replace(endpoints.stratz.get.pathParam.id, steamId),
            method: endpoints.stratz.get.method,
        };
        axiosApi.request(getConfig).then((response) => {
            if (response.status === 200) {
                setStratzData(response.data.results);
                toast({ status: 'success', title: 'Dados da steam carregados!', position: 'top' });
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' });
        });
    };
    console.log({ stratzData });

    useEffect(() => {
        if (searchParams.size > 0) {
            const openIdParams = Object.fromEntries(searchParams);
            console.log(openIdParams);
            if (openIdParams && openIdParams['openid.identity']) {
                const steamId = openIdParams['openid.identity']
                    .slice(openIdParams['openid.identity']
                        .lastIndexOf('/') + 1);
                setSteamID(steamId);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (steamId) {
            handleLoadStratzData();
        }
    }, [steamId]);

    return <Box mt={8}>
        {!steamId.length ?
            <Button onClick={handleSteamLogin} bgColor='#c7d5e0'>
                <Text>Entre pela Steam</Text>
                <Icon ml={2} as={BsSteam} />
            </Button> :
            <Button onClick={handleLogout} bgColor='#1b2838' color='white'>
                <Text>Sair da Steam</Text>
                <Icon ml={2} as={BsSteam} />
            </Button>}

        <Text>{steamId}</Text>

    </Box>;
};

export default SignupPage;
