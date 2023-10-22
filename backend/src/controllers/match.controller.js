const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { matchService } = require('../services');

const createMatch = catchAsync(async (req, res) => {
    const user = await matchService.createMatch(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getMatches = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await matchService.queryMatches(filter, options);
    res.send(result);
});

const getMatch = catchAsync(async (req, res) => {
    const user = await matchService.getMatchById(req.params.id);
    res.send(user);
});

const updateMatch = catchAsync(async (req, res) => {
    console.log('updateMatch');
    const user = await matchService.updateMatchById(req.params.id, req.body);
    res.send(user);
});

const deleteMatch = catchAsync(async (req, res) => {
    await matchService.deleteMatchById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createMatch,
    getMatches,
    getMatch,
    updateMatch,
    deleteMatch,
};
