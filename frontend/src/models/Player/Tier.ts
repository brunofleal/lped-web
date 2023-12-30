import { PlayerModel } from '../PlayerModel';

export const getTierFromPlayerModel = (playerModel: PlayerModel) => {
    const AVG_TIER = 3;
    const rank = playerModel.stratzApi.steamAccount.seasonRank ?
        Number(playerModel.stratzApi.steamAccount.seasonRank) :
        0;
    if (rank === 0) {
        return AVG_TIER;
    }

    return 9 - Math.floor(rank / 10);
};
