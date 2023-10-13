import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import TwitchSection from './TwitchSection/TwitchSection';

const HomePage = () => {
    return <Box mt={4}>
        <Accordion allowToggle>
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
                        <Text fontSize='2xl' fontWeight='bold'>Classificação</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    Sob Construção
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
