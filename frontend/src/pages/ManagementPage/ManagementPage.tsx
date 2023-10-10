import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react';

import AddTeamModal from './AddTeamModal';
import AddUserModal from './AddUserModal';

const ManagementPage = () => {
    return <Box>
        <Text bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            Gerenciamento
        </Text>
        <AddUserModal />
        <Divider m={2} />
        <AddTeamModal />
    </Box>;
};

export default ManagementPage;
