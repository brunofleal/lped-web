const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const playerClass = ['player', 'captain'];

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


playerSchema.plugin(toJSON);
playerSchema.plugin(paginate);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
