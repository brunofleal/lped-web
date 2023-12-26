import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { TeamModel } from '../../models/TeamModel';
import axiosApi from '../../shared/axiosApi';
import TeamTable from './TeamTable';

interface TeamsPageProps {
    previousSeason?: number;
}

const TeamsPage = ({ previousSeason }: TeamsPageProps) => {
    const [season, setSeason] = useState(0);
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const getCurrentSeasonRequest: AxiosRequestConfig = {
        url: endpoints.season.get.path,
        method: endpoints.season.get.method,
    };
    const getTeamsRequest: AxiosRequestConfig = {
        url: endpoints.team.list.path.replace(endpoints.team.list.queryParams.season, String(season)),
        method: endpoints.team.list.method,
    };

    useEffect(() => {
        if (previousSeason === undefined) {
            axiosApi.request(getCurrentSeasonRequest).then((response) => {
                if (response.status === 200) {
                    setSeason(response.data.currentSeason);
                }
            });
        }
    }, [previousSeason]);

    useEffect(() => {
        axiosApi.request(getTeamsRequest).then((response) => {
            if (response.status === 200) {
                setTeams(response.data.results);
            }
        });
    }, [season]);

    return <Box mt={4}>
        <Text
            bgGradient='linear(to-t, red.400, green.400, yellow.400, blue.400, pink.400)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
        >
            {season !== undefined ? `Times Temporada ${season + 1}` : 'Times Temporada Atual'}
        </Text>
        <Grid templateColumns='repeat(3, 2fr)' alignContent={'center'} gap={6}>
            {
                teams.map((team, index) => {
                    return <GridItem key={'t' + index}>
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
