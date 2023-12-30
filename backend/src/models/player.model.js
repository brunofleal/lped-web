const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const playerClass = ['player', 'captain', 'standing'];

const playerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dotaId: {
            type: Number,
            unique: true,
            required: true,
        },
        stratzApi: {
        },
        playerClass: {
            enum: playerClass,
            type: String,
            required: true,
            default: 'player',
        },
        seasons: {
            type: [Number],
            required: true
        },
        positionPrefs: {
            type: [Number],
            default: [],
            required: true,
        },
        tier: {
            type: Number,
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
