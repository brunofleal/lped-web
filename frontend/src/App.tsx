import {ChakraBaseProvider} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React, {FC} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';


const App: FC = () => {
    return (
        <ChakraBaseProvider theme={chakraTheme}>
        </ChakraBaseProvider>
    );
};

export default App;
