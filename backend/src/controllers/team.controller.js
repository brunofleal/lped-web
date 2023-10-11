const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { teamService } = require('../services');

const createTeam = catchAsync(async (req, res) => {
    const user = await teamService.createTeam(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getTeams = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await teamService.queryTeams(filter, options);
    res.send(result);
});

const getTeam = catchAsync(async (req, res) => {
    const user = await teamService.getTeamById(req.params.id);
    res.send(user);
});

const updateTeam = catchAsync(async (req, res) => {
    const user = await teamService.updateTeamById(req.params.userId, req.body);
    res.send(user);
});

const deleteTeam = catchAsync(async (req, res) => {
    await teamService.deleteTeamById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam,
};
