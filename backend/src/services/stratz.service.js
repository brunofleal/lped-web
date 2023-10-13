const { Stratz } = require('stratz.js');
const config = require('../config/config');

const stratz = new Stratz(config.stratz.token);

const getPlayerInfo = async (dotaId) => {
    const res = await stratz.getPlayer(dotaId);
    return res;
};

module.exports = {
    getPlayerInfo
};
