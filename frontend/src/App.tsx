import { ChakraBaseProvider } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React, { FC } from 'react';
import {
    RouterProvider,
} from 'react-router-dom';

import router from './shared/router';


const App: FC = () => {
    return (
        <ChakraBaseProvider theme={chakraTheme}>
            <RouterProvider router={router} />
        </ChakraBaseProvider>
    );
};

export default App;
