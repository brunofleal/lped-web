import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { PAYMENT_PHONE, WHATSAPP_GROUP } from '../../../../shared/links';

const PostSignupDiv = () => {
    const WPP_PHONE_LINK = `https://wa.me/${PAYMENT_PHONE}`;
    return <Box>
        <Text fontSize='xl'>
            Entre no Grupo de
            <Link color='green' href={WHATSAPP_GROUP} isExternal={true}> Whatsapp </Link>
            da Liga para se manter informado
        </Text>
        <Text fontSize='xl' flexDir='row'>
            Fale com o organizador através do número
            <Link color='green' href={WPP_PHONE_LINK} isExternal={true}> {PAYMENT_PHONE} </Link>
            para pagamento da taxa de inscrição(R$10) revertida na premiação
        </Text>d
    </Box>;
};


export default PostSignupDiv;
