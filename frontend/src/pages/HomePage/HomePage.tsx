import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Link,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RULES_LINK } from '../../shared/links';
import routes from '../../shared/routes';
import TwitchSection from './TwitchSection/TwitchSection';

const HomePage = () => {
    const navigate = useNavigate();
    return <Box mt={6}>
        <Box m={2}>
            <Text
                fontSize='6xl' fontFamily='heading' fontWeight='bold'
                bgGradient='linear(to-tr, blue.400, red.400)' bgClip='text'>
                Inscrições abertas para a temporada 2024.1
            </Text>
            <Button size='lg' variant='solid' colorScheme='blue' onClick={() => navigate(routes.SignupPage.path)}>
                Se Inscreva
            </Button>
        </Box>
        <Accordion allowToggle defaultIndex={1}>
            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='2xl' fontWeight='bold'>Sobre</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <AboutSection />
                </AccordionPanel>
            </AccordionItem>
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
                        <Text fontSize='2xl' fontWeight='bold'>
                            <Link href={RULES_LINK} isExternal={true}>Regras</Link>
                        </Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <iframe width={'80%'} height='600px'
                        src={RULES_LINK} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </Box>;
};

const AboutSection = () => {
    const aboutText = `A Liga Mipe Alegre surgiu de um movimento de amigos do dota,
    em sua maioria de pernambuco, de trazer jogos semanais/quinzenais num esquema de fase de
    grupos->playoffs para o entrenimento de todos os envolvidos. A liga é aberta a todos que
    queiram participar da resenha, sem pegar ar.`;

    const quotes = [
        { text: 'Tem dia que o cara acerta as psi blades', author: 'AWP, bebeT ' },
        { text: 'Olha a pedra', author: 'Rasta, Cleyton' },
        { text: 'Vamos! Capinar o lote!!!', author: 'Creyson, Seu' },
        { text: 'Vai perder para o meu Rasta HC!', author: 'Toalha, Seu' },
        { text: 'OIA!', author: 'Peludo, Urso' },
    ];
    const seed = Math.floor(Math.random() * 100);
    const randomQuote = quotes[seed % quotes.length];
    return <Box>
        <Text maxW='650px'>
            {aboutText}
        </Text>

        <Text mt={1} fontStyle='italic'>{`"${randomQuote.text}".- ${randomQuote.author}.`}</Text>
    </Box>;
};

export default HomePage;
