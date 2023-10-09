const httpStatus = require('http-status');
const { Player } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPlayerInfo } = require('./stratz.service');

const createPlayer = async (playerBody) => {
    const playerWithStratzData = await addStratzDataToPlayer(playerBody);
    console.log({ playerWithStratzData });
    let newPlayer = Player.create(playerWithStratzData);
    return newPlayer;
};

const addStratzDataToPlayer = async (playerBody) => {
    const playerData = {
        ...playerBody, stratzApi: { ...await getPlayerInfo(playerBody.dotaId) }
    };
    return playerData;
};

const queryPlayers = async (filter, options) => {
    const Players = await Player.paginate(filter, options);
    return Players;
};

const getPlayerById = async (id) => {
    return Player.findById(id);
};

const getPlayerByDotaId = async (dotaId) => {
    return Player.findOne({ dotaId });
};

const updatePlayerByDotaId = async (dotaId, updateBody) => {
    const Player = await getPlayerByDotaId(dotaId);
    if (!Player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    if (updateBody.dotaId && (await Player.isDotaIdTaken(updateBody.dotaId, dotaId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Player with dotaId already exists');
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
    getPlayerByDotaId,
    updatePlayerById,
    updatePlayerByDotaId,
    deletePlayerById,
};
