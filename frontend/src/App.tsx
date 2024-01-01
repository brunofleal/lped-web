import { ChakraBaseProvider } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import {
    RouterProvider,
} from 'react-router-dom';

import favicon from './assets/favicon/favicon-16x16.png';
import MadeByLinks from './components/MadeByLinks/MadeByLinks';
import router from './shared/router';


const App: FC = () => {
    return (
        <>
            <Helmet>
                <title>Mipe Alegre</title>
                <meta name="description" content="Liga Mipe Alegre de dota 2" />
                <meta name="theme-color" content="#008f68" />
                <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
            </Helmet>
            <ChakraBaseProvider theme={chakraTheme}>
                <RouterProvider router={router} />
            </ChakraBaseProvider>
            <MadeByLinks />
        </>
    );
};

export default App;
