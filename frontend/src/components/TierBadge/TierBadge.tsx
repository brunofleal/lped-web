import { Badge } from '@chakra-ui/react';
import React from 'react';

interface Props {
    tier: number;
}
const TierBadge = ({ tier }: Props) => {
    return <Badge
        fontStyle='oblique'
        p={1}
        variant='outline'
        borderRadius='md'
        colorScheme={tier > 0 ? 'blue' : 'gray'}
        fontSize='xl'>
        {tier ? tier : '?'}
    </Badge>;
};

export default TierBadge;
