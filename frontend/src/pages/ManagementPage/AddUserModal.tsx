import { Box, Button, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';

import endpoints from '../../constants/endpoints';
import axiosApi from '../../shared/axiosApi';


const AddUserModal = () => {
    const toast = useToast();
    const [dotaId, setDotaId] = useState('');
    const postConfig: AxiosRequestConfig = {
        url: endpoints.player.add.path,
        data: { dotaId },
        method: endpoints.player.add.method,
    };
    const handleCreateUser = () => {
        axiosApi.request(postConfig).then((response) => {
            if (response.status === 200) {
                toast({ status: 'success', title: 'jogador criado com sucesso!', position: 'top' });
            }
        }).catch((error: AxiosError) => {
            if (error?.response?.status === 500) {
                toast({ status: 'error', title: 'Usuário com este id já existe!', position: 'top' });
            } else {
                toast({ status: 'error', title: 'Falha na criação do usuário', position: 'top' });
            }
        });
    };

    return <Box>
        <Text bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            Gerenciamento
        </Text>
        <HStack justify={'flex-start'}>
            <Text>Novo Usuário</Text>
            <Input
                width={'auto'}
                placeholder='ID do dota, ex:84046837'
                onChange={(event) => setDotaId(event.currentTarget.value)}
                value={dotaId}
            />
            <Button variant={'solid'} onClick={handleCreateUser}
                disabled={Number.isInteger(dotaId) && !Number.isNaN(dotaId)}>
                Adicionar
            </Button>
        </HStack>
        <input></input>
    </Box>;
};

export default AddUserModal;
