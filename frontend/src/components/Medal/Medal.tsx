import { Image } from '@chakra-ui/react';
import * as React from 'react';

import rankImages from './rankImages';

interface Props {
    fullRank: number;
}
const Medal = ({ fullRank }: Props) => {
    const imageIndex = getImageIndexFromFullRank(fullRank);

    return (
        <Image h='50px' objectFit='cover' src={rankImages[imageIndex]} alt={''} />
    );
};

const getImageIndexFromFullRank = (fullRank: number) => {
    const [rank, stars] = [Math.floor(fullRank / 10), fullRank % 10];
    let imageIndex = 0;
    if (rank >= 8) {
        imageIndex = rankImages.length - 1;
    } else if (rank > 0) {
        imageIndex = Math.min(1 + (rank - 1) * 5 + (stars - 1), rankImages.length - 1);
    }
    return imageIndex;
};


export default Medal;
