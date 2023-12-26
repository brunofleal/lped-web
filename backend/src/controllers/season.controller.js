const catchAsync = require('../utils/catchAsync');
const { getSeasonInfo } = require('../services/season.service');

const getCurrentSeason = catchAsync(async (req, res) => {
    const result = getSeasonInfo();
    res.send(result);
});

module.exports = {
    getCurrentSeason
};
