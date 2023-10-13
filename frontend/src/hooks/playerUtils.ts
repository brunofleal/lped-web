import { PlayerModel } from '../models/PlayerModel';

const getValidPlayerName = (playerInfo: PlayerModel) => {
    if (playerInfo?.stratzApi?.identity?.name) {
        return playerInfo?.stratzApi?.identity?.name;
    }
    if (playerInfo?.stratzApi?.names && playerInfo?.stratzApi?.names[0]?.name) {
        return playerInfo?.stratzApi?.names[0]?.name;
    } if (playerInfo?.stratzApi?.steamAccount?.name) {
        return playerInfo?.stratzApi?.steamAccount?.name;
    }
    if (playerInfo?.stratzApi?.identity?.name) {
        return playerInfo?.stratzApi?.identity?.name;
    }
};

export { getValidPlayerName };
