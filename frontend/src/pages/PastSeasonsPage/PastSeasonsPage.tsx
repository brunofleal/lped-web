import { Box, HStack, Select } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import React, { useState } from 'react';

import TeamsPage from '../TeamsPage/TeamsPage';

interface SeasonResult {
    stratzUrl: string;
}

const PastSeasonsPage = () => {
    const [season, setSeason] = useState<number>(0);
    const SeasonResults: SeasonResult[] = [{ stratzUrl: 'https://stratz.com/leagues/15842' }];

    return <Box mt={8}>
        <HStack>
            <Select variant='filled' w='200px' onChange={(event) => setSeason(Number(event.currentTarget.value) ?? 0)}>
                {
                    SeasonResults.map((SeasonResult, index) => {
                        return <option key={index} value={index}>Temporada {index + 1}</option>;
                    })
                }
            </Select>
            <ChakraLink fontSize={'xl'} isExternal href={SeasonResults[season].stratzUrl}> Estatistícas da temporada</ChakraLink>
        </HStack>
        <TeamsPage previousSeason={season} />
    </Box >;
};

export default PastSeasonsPage;
