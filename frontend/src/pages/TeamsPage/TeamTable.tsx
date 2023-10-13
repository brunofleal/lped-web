import { Grid } from '@chakra-ui/react';
import React from 'react';

import { TeamModel } from '../../models/TeamModel';
import PlayersTable from '../PlayersPage/PlayersTable';

interface TeamTableProps {
    team: TeamModel;
}
const TeamTable = ({ team }: TeamTableProps) => {
    console.log({ id: team.captainDotaId, team: team.playerIds, teamM: team });
    return <Grid>
        <PlayersTable captainDotaId={team.captainDotaId} playerIds={[team.captainDotaId, ...team.playerIds]} />
    </Grid>;
};

export default TeamTable;
