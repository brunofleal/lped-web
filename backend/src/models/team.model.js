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
        season: {
            type: Number,
            default: 0,
            required: true
        },
        season: {
            type: Number,
            required: true
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
