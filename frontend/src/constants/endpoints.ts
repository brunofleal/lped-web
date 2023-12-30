const endpoints = {
    player: {
        add: {
            path: '/api/player',
            reqBodyParams: {
                dotaId: 'dotaId',
            },
            method: 'POST',
        },
        edit: {
            path: '/api/player/:dotaId',
            pathParam: {
                dotaId: ':dotaId',
            },
            reqBodyParams: {
                dotaId: 'dotaId',
            },
            method: 'PUT',
        },
        list: {
            path: '/api/player?limit=100', // TODO: Keep limit at 100, for now
            method: 'GET',
        },
        getOne: {
            path: '/api/player/:dotaId', // TODO: Keep limit at 100, for now
            method: 'GET',
            pathParam: {
                dotaId: ':dotaId',
            },
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
            path: '/api/team?season=:season&limit=1000&sortBy=ranking',
            method: 'GET',
            queryParams: {
                season: ':season',
            },
        },
        update: {
            path: '/api/team/:teamid',
            pathParam: {
                teamid: ':teamid',
            },
            method: 'PATCH',
        },
    },
    season: {
        get: {
            path: '/api/season',
            method: 'GET',
        },
    },
    steam: {
        auth: {
            path: '/api/steam/auth',
            method: 'GET',
        },

    },
    stratz: {
        get: {
            path: '/api/stratz/:id',
            method: 'GET',
            pathParam: {
                id: ':id',
            },
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
