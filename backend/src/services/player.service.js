const httpStatus = require('http-status');
const { Player } = require('../models');
const ApiError = require('../utils/ApiError');

const createPlayer = async (playerBody) => {
    let newPlayer = Player.create(playerBody);
    newPlayer = addDotaDataToPlayer(newPlayer);
    return newPlayer;
};

const addDotaDataToPlayer = async (playerBody) => {
    return playerBody;
};

const queryPlayers = async (filter, options) => {
    const Players = await Player.paginate(filter, options);
    return Players;
};

const getPlayerById = async (id) => {
    return Player.findById(id);
};

const getPlayerBySteamid = async (steamid) => {
    return Player.findOne({ steamid });
};

const updatePlayerBySteamid = async (steamid, updateBody) => {
    const Player = await getPlayerBySteamid(steamid);
    if (!Player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    if (updateBody.steamid && (await Player.isSteamidTaken(updateBody.steamid, steamid))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Player with steamid already exists');
    }
    Object.assign(Player, updateBody);
    await Player.save();
    return Player;
};

const updatePlayerById = async (playerid, updateBody) => {
    const user = await getUserById(playerid);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deletePlayerById = async (PlayerId) => {
    const Player = await getPlayerById(PlayerId);
    if (!Player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    await Player.remove();
    return Player;
};

module.exports = {
    createPlayer,
    queryPlayers,
    getPlayerById,
    getPlayerBySteamid,
    updatePlayerById,
    updatePlayerBySteamid,
    deletePlayerById,
};
