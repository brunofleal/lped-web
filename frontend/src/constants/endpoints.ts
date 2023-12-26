const endpoints = {
    player: {
        add: {
            path: '/api/player',
            reqBodyParams: {
                dotaId: 'dotaId',
            },
            method: 'POST',
        },
        list: {
            path: '/api/player?limit=100', // TODO: Keep limit at 100, for now
            method: 'GET',
        },
    },
    team: {
        add: {
            path: '/api/team',
            reqBodyParams: {
                name: 'name',
                captainDotaId: 'captainDotaId',
            },
            method: 'POST',
        },
        list: {
            path: '/api/team?limit=1000',
            method: 'GET',
        },
        update: {
            path: '/api/team/:teamid',
            pathParam: {
                teamid: ':teamid',
            },
            method: 'PATCH',
        },
    },
    match: {
        add: {
            path: '/api/match',
            reqBodyParams: {
                winnerTeam: 'winnerTeam',
                loserTeam: 'loserTeam',
            },
            method: 'POST',
        },
        list: {
            path: '/api/match',
            method: 'GET',
        },
        update: {
            path: '/api/match/:matchId',
            pathParam: {
                matchId: ':matchId',
            },
            method: 'PATCH',
        },
    },
    auth: {
        get: {
            path: '/api/auth/:token',
            pathParam: {
                token: ':token',
            },
            method: 'GET',
        },
    },
};

export default endpoints;
