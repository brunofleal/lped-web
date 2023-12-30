const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { playerService } = require('../services');

const createPlayer = catchAsync(async (req, res) => {
    const user = await playerService.createPlayer(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getPlayers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['dotaId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await playerService.queryPlayers(filter, options);
    res.send(result);
});

const getPlayer = catchAsync(async (req, res) => {
    console.log(req.params);
    const user = await playerService.getPlayerByDotaId(req.params.dotaId);
    res.send(user);
});

const updatePlayer = catchAsync(async (req, res) => {
    const user = await playerService.updatePlayerByDotaId(req.params.dotaId, req.body);
    res.send(user);
});

const deletePlayer = catchAsync(async (req, res) => {
    await playerService.deletePlayerByDotaId(req.params.dotaId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPlayer,
    getPlayers,
    getPlayer,
    updatePlayer,
    deletePlayer,
};
