import { Box, Button, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';

import endpoints from '../../constants/endpoints';
import axiosApi from '../../shared/axiosApi';


const AddTeamModal = () => {
    const toast = useToast();
    const [teamName, setTeamName] = useState('');
    const [captainDotaId, setCaptainDotaId] = useState('');

    const postConfig: AxiosRequestConfig = {
        url: endpoints.team.add.path,
        data: { captainDotaId, name: teamName },
        method: endpoints.player.add.method,
    };
    const handleCreateUser = () => {
        axiosApi.request(postConfig).then((response) => {
            if (response.status === 200) {
                toast({ status: 'success', title: 'Time criado com sucesso!', position: 'top' });
            }
        }).catch((error: AxiosError) => {
            if (error?.response?.status === 500) {
                toast({ status: 'error', title: 'Time com este nome já existe!', position: 'top' });
            } else {
                toast({ status: 'error', title: 'Falha na criação do Time', position: 'top' });
            }
        });
    };

    return <Box>
        <HStack justify={'flex-start'}>
            <Text>Novo Time</Text>
            <Input
                type='text'
                width={'auto'}
                placeholder='Nome do time'
                onChange={(event) => setTeamName(event.currentTarget.value)}
                value={teamName}
            />
            <Input
                type='number'
                width={'auto'}
                placeholder='Id do capitão do time'
                onChange={(event) => setCaptainDotaId(event.currentTarget.value)}
                value={captainDotaId}
            />
            <Button variant={'solid'} onClick={handleCreateUser}
                isDisabled={!teamName.length || !captainDotaId.length || Number.isNaN(captainDotaId)}>
                Adicionar
            </Button>
        </HStack>
    </Box>;
};

export default AddTeamModal;
