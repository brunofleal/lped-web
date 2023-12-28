const catchAsync = require('../utils/catchAsync');
const { stratzService } = require('../services');

const getStratzPlayerData = catchAsync(async (req, res) => {
    const stratzData = await stratzService.getPlayerInfo(req.params.id);
    res.send(stratzData);
});

module.exports = {
    getStratzPlayerData
};