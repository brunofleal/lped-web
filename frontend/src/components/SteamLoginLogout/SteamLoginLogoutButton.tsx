import { Button, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsSteam } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import endpoints from '../../constants/endpoints';
import { clearAvatar } from '../../hooks/avatar';
import { clearToken, retrieveToken } from '../../hooks/token';
import { BASE_URL } from '../../shared/axiosApi';
import routes from '../../shared/routes';


const SteamLoginLogoutButton = () => {
    const navigate = useNavigate();
    const handleSteamLogin = () => {
        location.href = `${BASE_URL}${endpoints.steam.auth.path}`;
    };

    const handleSteamLogout = () => {
        clearToken();
        clearAvatar();
        navigate(routes.SignupPage.path);
    };
    const steamId3 = retrieveToken();
    if (!steamId3.length) {
        return <Button onClick={handleSteamLogin} bgColor='#c7d5e0'>
            <Text>Login Steam</Text>
            <Icon ml={2} as={BsSteam} />
        </Button>;
    }

    return <Button onClick={handleSteamLogout} bgColor='#1b2838' color='white'>
        <Text>Logout Steam</Text>
        <Icon ml={2} as={BsSteam} />
    </Button>;
};

export default SteamLoginLogoutButton;
