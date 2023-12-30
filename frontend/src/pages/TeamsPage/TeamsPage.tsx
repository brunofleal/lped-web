import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { Method } from 'axios';
import React from 'react';

import endpoints from '../../constants/endpoints';
import useFetch from '../../hooks/Fetch';
import { TeamModel } from '../../models/TeamModel';
import TeamTable from './TeamTable';

interface TeamsPageProps {
    previousSeason?: number;
}

const TeamsPage = ({ previousSeason }: TeamsPageProps) => {
    const { data: seasonData } =
        useFetch<{ currentSeason: number; }>({ axiosConfig: { url: endpoints.season.get.path, method: 'GET' } });
    const currentSeason = seasonData ? seasonData.currentSeason : 0;

    const { data: teams, loading: loadingTeams } = useFetch<TeamModel[]>({
        axiosConfig: {
            url: endpoints.team.list.path.replace(endpoints.team.list.queryParams.season,
                previousSeason !== undefined ? String(previousSeason) :
                    String(currentSeason)),
            method: endpoints.team.list.method as Method,
        },
    });


    return <Box mt={4}>
        <Text
            bgGradient='linear(to-t, red.400, green.400, yellow.400, blue.400, pink.400)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
        >
            {previousSeason !== undefined ? `Times Temporada ${previousSeason + 1}` : 'Times Temporada Atual'}
        </Text>
        <Grid
            templateColumns='repeat(3, 2fr)'
            alignContent={'center'} gap={6}
            visibility={loadingTeams ? 'hidden' : 'visible'}>
            {
                (teams ?? []).map((team, index) => {
                    return <GridItem key={Math.random() + index}>
                        <Box h={'auto'}>
                            <TeamTable team={team} styleIndex={index} />
                        </Box>
                    </GridItem>;
                })
            }
        </Grid>
    </Box>;
};

export default TeamsPage;
