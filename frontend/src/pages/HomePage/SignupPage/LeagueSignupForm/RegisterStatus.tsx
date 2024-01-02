import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCheck2Circle, BsXCircle } from 'react-icons/bs';

import { retrieveToken } from '../../../../hooks/token';

interface Props {
    isRegisteredInSeason: boolean;
}
const RegisterStatus = ({ isRegisteredInSeason }: Props) => {
    const steamId3 = retrieveToken();
    if (steamId3.length) {
        return <HStack border='1px' borderStyle='groove' borderRadius='md' p={1}>
            <Text fontSize={'xl'}>
                Jogador <span style={{ fontWeight: 'bold' }}>
                    {isRegisteredInSeason ? 'inscrito' : 'não inscrito'}
                </span> na temporada atual
            </Text>
            <Icon boxSize='30px'
                color={isRegisteredInSeason ? 'green' : 'red'}
                as={isRegisteredInSeason ? BsCheck2Circle : BsXCircle} />
        </HStack>;
    }

    return <></>;
};

export default RegisterStatus;
