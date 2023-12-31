import { HStack, Icon, Image, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { BsSteam } from 'react-icons/bs';

import dotaIcon from '../../../assets/images/dota.png';
import { PlayerModel } from '../../../models/PlayerModel';


const PlayerLinks = ({ player }: { player: PlayerModel; }) => {
    return <HStack gap={0}>
        <ChakraLink
            href={`https://stratz.com/players/${String(player?.dotaId)}`}
            isExternal={true}
        >
            <Image
                fit='cover'
                boxSize={'20px'}
                w={'20px'}
                src={dotaIcon}
            />
        </ChakraLink>;
        <ChakraLink
            href={player.stratzApi.steamAccount.profileUri?.replace('htpps', 'http')}
            isExternal={true}
        >
            <Icon as={BsSteam} boxSize={'20px'} borderRadius={'25%'} />
        </ChakraLink>
    </HStack>;
};

export default PlayerLinks;
