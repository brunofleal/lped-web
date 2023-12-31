import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../shared/routes';
import TwitchSection from './TwitchSection/TwitchSection';

const HomePage = () => {
    const navigate = useNavigate();
    return <Box mt={6}>
        <Box m={2}>
            <Text fontSize='xl' w='650px'>
                Inscrições Abertas para jogadores e standings para a temporada(2) 2024.1
                Fase de grupos iniciando em jan/fev
            </Text>
            <Button size='lg' variant='solid' colorScheme='blue' onClick={() => navigate(routes.SignupPage.path)}>
                Se Inscreva
            </Button>
        </Box>
        <Accordion allowToggle defaultIndex={1}>
            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='2xl' fontWeight='bold'>Canais de Transmissão</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <TwitchSection />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='2xl' fontWeight='bold'>Regras</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    Regras
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </Box>;
};

export default HomePage;
