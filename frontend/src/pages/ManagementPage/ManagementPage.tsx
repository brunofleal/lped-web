import { Box, Button, Divider, HStack, Input, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearToken, isAuthTokenValid, setToken } from '../../hooks/auth';
import routes from '../../shared/routes';
import AddTeamModal from './AddTeamModal';
import AddUserModal from './AddUserModal';

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
        {isAdmin ? <AdminManagementSection /> :
            <HStack w='350px'>
                <Input
                    type='password'
                    placeholder='token de acesso'
                    mr={2}
                    value={tokenAttempt}
                    onChange={(event) => setTokenAttempt(event.target.value)}
                />
                <Button fontWeight={'bold'} fontSize={'2xl'} onClick={handleLogin}>Login</Button>
            </HStack>
        }

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
        <AddUserModal />
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
