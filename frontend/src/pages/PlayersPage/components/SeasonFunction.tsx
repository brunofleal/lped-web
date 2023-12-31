import { Text } from '@chakra-ui/react';
import React from 'react';

import { PlayerType } from '../../../models/Player/PlayerType';

interface Props {
    type?: PlayerType;
}
const SeasonFunction = ({ type }: Props) => {
    if (!type) {
        return <Text fontWeight='bold' fontSize='lg'>?</Text>;
    }
    const valueMap = {
        [PlayerType.Capitão]: 'Capitão',
        [PlayerType.Jogador]: 'Jogador',
        [PlayerType.Standing]: 'Standing',
    };
    const colorMap = {
        [PlayerType.Capitão]: 'red',
        [PlayerType.Jogador]: 'blue',
        [PlayerType.Standing]: 'green',
    };
    return <Text fontWeight='bold' color={colorMap[type]}>{valueMap[type]}</Text>;
};

export default SeasonFunction;
