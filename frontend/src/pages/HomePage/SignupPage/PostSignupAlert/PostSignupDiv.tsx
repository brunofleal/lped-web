import { Button, Divider, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

import { PAYMENT_PHONE, WHATSAPP_GROUP } from '../../../../shared/links';

const PostSignupDiv = () => {
    const WPP_PHONE_LINK = `https://wa.me/${PAYMENT_PHONE}`;
    return <VStack align='start'>
        <Divider my={2} />
        <Button rightIcon={<Icon as={BsWhatsapp} />}
            colorScheme='whatsapp'
            onClick={() => window.open(WHATSAPP_GROUP, 'blank')}>
            Entre no Grupo de Whatsapp
        </Button>
        <HStack>
            <Text>Pague a taxa(R$10)</Text>
            <Button rightIcon={<Icon as={BsWhatsapp} />}
                colorScheme='whatsapp'
                onClick={() => window.open(WPP_PHONE_LINK, 'blank')}>
                Fale com o Organizador
            </Button>
        </HStack>
    </VStack >;
};


export default PostSignupDiv;
