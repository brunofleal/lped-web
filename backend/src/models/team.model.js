const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        captainDotaId: {
            type: Number,
            required: true,
        },
        playerIds: {
            type: Array,
            required: true,
        },
        wins: {
            type: Number,
            required: false,
        },
        losses: {
            type: Number,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);


teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
