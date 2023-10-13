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
            path: '/api/team',
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
};

export default endpoints;
