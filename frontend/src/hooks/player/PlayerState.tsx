import { Method } from 'axios';

import endpoints from '../../constants/endpoints';
import { PlayerModel } from '../../models/PlayerModel';
import useFetch from '../Fetch';
import { retrieveToken } from '../token';

interface StateProps {
    customSteamId?: string;
}

const usePlayerState = (props?: StateProps) => {
    const idToSearch = props && props.customSteamId ? props.customSteamId : retrieveToken();

    const { data: seasonData } =
        useFetch<{ currentSeason: number; }>({ axiosConfig: { url: endpoints.season.get.path, method: 'GET' } });
    const currentSeason = seasonData ? seasonData.currentSeason : 0;

    const { data: savedPlayerModel } = useFetch<PlayerModel>({
        axiosConfig: {
            url: idToSearch ?
                endpoints.player.getOne.path.replace(endpoints.player.getOne.pathParam.dotaId, idToSearch) :
                '',
            method: endpoints.player.getOne.method as Method,
        },
        controlFetch: true,
    });

    const exists = !!savedPlayerModel;
    const isRegisteredInSeason = exists ? savedPlayerModel.seasons?.includes(currentSeason) : false;
    const inTeam = exists && savedPlayerModel.teamId;
    return { exists, isRegisteredInSeason, inTeam };
};

export default usePlayerState;


