import { Box, Button, Divider, FormLabel, HStack, Icon, Input, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import PlayerCard from '../../components/PlayerCard/PlayerCard';
import SteamLoginLogoutButton from '../../components/SteamLoginLogout/SteamLoginLogoutButton';
import { clearToken, isAuthTokenValid, setToken } from '../../hooks/auth';
import { retrieveToken } from '../../hooks/token';
import routes from '../../shared/routes';
import AddTeamModal from './AddTeamModal';
import LeagueHistoryLinks from './LeagueHistoryLinks/LeagueHistoryLinks';

const ManagementPage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [tokenAttempt, setTokenAttempt] = useState<string>('');

    const handleLogin = () => {
        setToken(tokenAttempt);
        navigate(routes.ManagementPage.path);
    };

    const isAdmin = isAuthTokenValid();

    useEffect(() => {
        if (isAdmin) {
            toast({
                status: 'info',
                title: `Usuário com privilégios de admin`,
                position: 'top',
            });
        }
    }, [isAdmin]);

    return <Box mt={6}>
        <HStack>
            <SteamLoginLogoutButton />
            {
                retrieveToken() ?
                    <Button
                        colorScheme='blue'
                        onClick={() => navigate(routes.SignupPage.path)}>
                        Gerir Registro <Icon ml={2} as={BsPencil} />
                    </Button> :
                    <></>
            }
        </HStack>
        <PlayerCard />
        <Divider my={2} />
        {isAdmin ? <AdminManagementSection /> :
            <HStack w='500px' >
                <FormLabel w='250px'>Acesso de Admin</FormLabel>
                <Input
                    type='password'
                    placeholder='Senha de Admin'
                    mr={2}
                    value={tokenAttempt}
                    onChange={(event) => setTokenAttempt(event.target.value)}
                />
                <Button variant='outline' colorScheme='blue'
                    fontWeight={'bold'} fontSize={'2xl'} onClick={handleLogin}
                >
                    Login
                </Button>
            </HStack>
        }
        <Divider my={2} />
        <LeagueHistoryLinks />

    </Box >;
};

const AdminManagementSection = () => {
    const navigate = useNavigate();
    return <>
        <Text bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            Gerenciamento
        </Text>
        <Divider m={2} />
        <AddTeamModal />
        <Button onClick={() => {
            clearToken();
            navigate(routes.ManagementPage.path);
        }} mt={2}>
            Remover Autenticação
        </Button>
    </>;
};

export default ManagementPage;
