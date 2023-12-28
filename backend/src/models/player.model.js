const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const playerClass = ['player', 'captain', 'standing'];

const playerSchema = mongoose.Schema(
    {
        dotaId: {
            type: Number,
            unique: true,
            required: true,
        },
        stratzApi: {
        },
        playerClass: {
            type: playerClass,
            required: false,
            default: 'player',
        },
        seasons: {
            type: [Number],
            default: [0],
            required: true
        },
        positionPrefs: {
            type: [Number],
            default: [],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);


playerSchema.plugin(toJSON);
playerSchema.plugin(paginate);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
