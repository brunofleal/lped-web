const httpStatus = require('http-status');
const { Team } = require('../models');
const ApiError = require('../utils/ApiError');

const createTeam = async (teamBody) => {
    let newTeam = Team.create(teamBody);
    return newTeam;
};

const queryTeams = async (filter, options) => {
    const Teams = await Team.paginate(filter, options);
    return Teams;
};

const getTeamById = async (id) => {
    return Team.findById(id);
};

const updateTeamById = async (id, updateBody) => {
    const team = await getTeamById(id);
    if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
    }
    Object.assign(team, updateBody);
    await team.save();
    return team;
};

const deleteTeamById = async (TeamId) => {
    const Team = await getTeamById(TeamId);
    if (!Team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
    }
    await Team.remove();
    return Team;
};

module.exports = {
    createTeam,
    queryTeams,
    getTeamById,
    updateTeamById,
    deleteTeamById,
};
