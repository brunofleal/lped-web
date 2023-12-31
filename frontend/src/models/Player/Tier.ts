import { PlayerModel } from '../PlayerModel';

export const getTierFromPlayerModel = (playerModel: PlayerModel) => {
    const UNKNOW_TIER = 0;
    if (
        !playerModel ||
        !playerModel.stratzApi ||
        !playerModel.stratzApi.steamAccount) {
        return UNKNOW_TIER;
    }
    const rank = playerModel.stratzApi.steamAccount.seasonRank ?
        Number(playerModel.stratzApi.steamAccount.seasonRank) :
        0;
    if (rank > 90 || rank <= 0) {
        return UNKNOW_TIER;
    }

    return 9 - Math.floor(rank / 10);
};
