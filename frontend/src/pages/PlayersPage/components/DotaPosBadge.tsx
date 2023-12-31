import { Badge, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsStarFill } from 'react-icons/bs';

import { Role, Roles } from '../../../models/Player/Role';
interface Props {
    roleId: number;
    isPrimary?: boolean;
}
const DotaPosBadge = ({ roleId, isPrimary }: Props) => {
    const styleProps = { borderRadius: 'lg' };
    const role: Role = Roles.filter(({ id }: Role) => {
        return id === roleId;
    })[0];
    if (!role) {
        return <Badge justifyContent='center' style={styleProps} colorScheme='gray'>?</Badge>;
    }
    return <Badge h='20px'
        justifyContent='center'
        style={styleProps} colorScheme={role.color}>
        <HStack>
            <Text mr={0}>{role.name}</Text>
            {isPrimary ? <Icon as={BsStarFill} /> : <></>}
        </HStack>
    </Badge>;
};

export default DotaPosBadge;
