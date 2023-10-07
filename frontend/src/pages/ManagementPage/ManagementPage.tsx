import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import React from 'react';

const ManagementPage = () => {
    return <Box>
        <AddUserModal />
    </Box>;
};

const AddUserModal = () => {
    const handleCreateUser = () => { };
    return <Box>
        <Text bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            Gerenciamento
        </Text>
        <HStack w={'600px'} justify={'flex-start'}>
            <Text w={'170px'}>Novo Usuário</Text>
            <Input placeholder='SteamId, ex:76561198044312565'></Input>
            <Button variant={'solid'} onClick={handleCreateUser}>Adicionar</Button>
        </HStack>
        <input></input>
    </Box>;
};

export default ManagementPage;
