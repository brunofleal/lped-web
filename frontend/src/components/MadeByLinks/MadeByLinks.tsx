import { HStack, Icon, Link } from '@chakra-ui/react';
import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';

const MadeByLinks = () => {
    return (
        <HStack height="calc(100% - 60px)">
            © 2024 Bruno Leal
            <Link ml={1} href="https://github.com/brunofleal/lped-web" isExternal={true}>
                <Icon as={FaGithub} />
            </Link>
            <Link m={1} href="https://www.linkedin.com/in/brunofleal" isExternal={true}>
                <Icon as={AiFillLinkedin} />
            </Link>
        </HStack>
    );
};

export default MadeByLinks;
