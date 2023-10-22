const httpStatus = require('http-status');
const { Match } = require('../models');
const ApiError = require('../utils/ApiError');

const createMatch = async (matchBody) => {
    let newMatch = Match.create(matchBody);
    return newMatch;
};

const queryMatches = async (filter, options) => {
    const Matches = await Match.paginate(filter, options);
    return Matches;
};

const getMatchById = async (id) => {
    return Match.findById(id);
};

const updateMatchById = async (id, updateBody) => {
    const match = await getMatchById(id);
    if (!match) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
    }
    Object.assign(match, updateBody);
    await match.save();
    return match;
};

const deleteMatchById = async (MatchId) => {
    const Match = await getMatchById(MatchId);
    if (!Match) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
    }
    await Match.remove();
    return Match;
};

module.exports = {
    createMatch,
    queryMatches,
    getMatchById,
    updateMatchById,
    deleteMatchById,
};
