const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

const auth = catchAsync(async (req, res) => {
    if (req.params.token === config.auth.token) {
        res.status(200).end();
    } else {
        res.status(500);
    }
});


module.exports = {
    auth
};
