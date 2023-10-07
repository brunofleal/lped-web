import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import routes from '../../shared/routes';

const PageWrapper: FC = () => {
    const { pathname } = useLocation();
    const linkProps = (route: string) => {
        return {
            href: route, textDecoration: pathname === route ? 'underline' : 'none', fontSize: 24, fontWeight: 'bold', _hover: { color: 'white' },
        };
    };

    return <Box mb={2} h='calc(97vh)'>
        <VStack bgGradient='linear(to-r, blue.200, blue.800)'>
            <Breadcrumb separator='-'>
                <BreadcrumbItem>
                    <BreadcrumbLink {...linkProps(routes.HomePage.path)}>
                        Liga
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink {...linkProps(routes.PlayersPage.path)} href={routes.PlayersPage.path}>
                        Jogadores
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink {...linkProps(routes.TeamsPage.path)} href={routes.TeamsPage.path}>
                        Times
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink {...linkProps(routes.ManagementPage.path)} href={routes.ManagementPage.path}>
                        Gerenciamento
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb></VStack>
        <Box bgColor={'white'} w={'100%'} p={2}>
            <Outlet />
        </Box >
    </Box>;
};

export default PageWrapper;
