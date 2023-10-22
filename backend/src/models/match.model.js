const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const matchSchema = mongoose.Schema(
    {
        winnerTeamId: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        loserTeamId: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        matchId: {
            type: String,
            required: false,
        },
        vod: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);


matchSchema.plugin(toJSON);
matchSchema.plugin(paginate);

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
