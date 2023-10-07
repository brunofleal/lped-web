const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const playerClass = ['player', 'captain', 'standing'];

const playerSchema = mongoose.Schema(
    {
        steamid: {
            unique: true,
            type: String,
            required: true,
            trim: true,
        },
        playerClass: {
            type: playerClass,
            required: false,
            default: 'player',
        },
        positionPrefs: {
            type: Array,
            default: [],
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

playerSchema.statics.isSteamidTaken = async function (steamid, excludeSteamid) {
    const user = await this.findOne({ steamid, _id: { $ne: excludeSteamid } });
    return !!user;
};

playerSchema.plugin(toJSON);
playerSchema.plugin(paginate);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
