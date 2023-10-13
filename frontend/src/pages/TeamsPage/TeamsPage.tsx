import { Box, Grid, Text } from '@chakra-ui/react';
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

    return <Grid>
        <Text>Teams Page</Text>;
        {
            teams.map((team, index) => {
                return <Box key={'t' + index} w={'400px'} h={'600px'}>
                    <TeamTable team={team} />
                </Box>;
            })}

    </Grid>;
};

export default TeamsPage;
