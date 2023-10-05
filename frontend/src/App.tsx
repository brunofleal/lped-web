import React, {FC} from 'react';
import {ChakraBaseProvider} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import {Stack, Text} from '@chakra-ui/react';


const App:FC = () => {
  return (
    <ChakraBaseProvider theme={chakraTheme}>
      <Stack spacing={3}>

        <Text fontSize='5xl'>(5xl)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='4xl'>(4xl)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='3xl'>(3xl)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='2xl'>(2xl)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='xl'>(xl)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='lg'>(lg)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='md'>(md)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='sm'>(sm)Liga Pernambucana de Dota 2</Text>
        <Text fontSize='xs'>(xs)Liga Pernambucana de Dota 2</Text>
      </Stack>
    </ChakraBaseProvider>
  );
};

export default App;
