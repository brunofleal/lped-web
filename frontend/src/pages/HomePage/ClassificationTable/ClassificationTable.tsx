import { Box, Table } from '@chakra-ui/react';
import React from 'react';

import { isAuthTokenValid } from '../../../hooks/auth';
import AddMatchModal from './AddMatchModal';

const ClassificationTable = () => {
    return <Box>
        {isAuthTokenValid() ? <AddMatchModal /> : <></>}
        <Table></Table>
    </Box>;
};

export default ClassificationTable;
