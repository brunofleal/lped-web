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
                teamName: 'teamName',
            },
            method: 'POST',
        },
    },
};

export default endpoints;
