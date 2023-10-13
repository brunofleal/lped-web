import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { TeamModel } from '../../models/TeamModel';
import axiosApi from '../../shared/axiosApi';
import TeamTable from './TeamTable';

const TeamsPage = () => {
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const getTeamsRequest: AxiosRequestConfig = { url: endpoints.team.list.path, method: endpoints.team.list.method };
    useEffect(() => {
        axiosApi.request(getTeamsRequest).then((response) => {
            if (response.status === 200) {
                setTeams(response.data.results);
            } else {
                console.log('TODO: Toast error');
            }
        });
    }, []);

    return <Box>
        <Text>Teams Page</Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            {
                teams.map((team, index) => {
                    return <GridItem key={'t' + index}>
                        <Box w={'400px'} h={'auto'}>
                            <TeamTable team={team} styleIndex={index} />
                        </Box>
                    </GridItem>;
                })
            }
        </Grid>
    </Box>;
};

export default TeamsPage;
