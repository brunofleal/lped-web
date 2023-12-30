const httpStatus = require('http-status');
const { Player } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPlayerInfo } = require('./stratz.service');

const createPlayer = async (playerBody) => {
    let newPlayer = Player.create(playerBody);
    return newPlayer;
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

const getPlayersByDotaId = async (dotaIds) => {
    const players = [];
    for (const dotaId in dotaIds) {
        players.push(Player.findOne({ dotaId }));
    }
    return players;
};

const updatePlayerByDotaId = async (dotaId, updateBody) => {
    const Player = await getPlayerByDotaId(dotaId);
    if (!Player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    Object.assign(Player, updateBody);
    await Player.save();
    return Player;
};

const updatePlayerById = async (playerid, updateBody) => {
    const player = await getPlayerById(playerid);
    if (!player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    Object.assign(player, updateBody);
    await player.save();
    return player;
};

const deletePlayerById = async (PlayerId) => {
    const Player = await getPlayerById(PlayerId);
    if (!Player) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
    }
    await Player.remove();
    return Player;
};

const deletePlayerByDotaId = async (dotaId) => {
    const Player = await getPlayerByDotaId(dotaId);
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
    getPlayersByDotaId,
    getPlayerByDotaId,
    updatePlayerById,
    updatePlayerByDotaId,
    deletePlayerById,
    deletePlayerByDotaId
};
