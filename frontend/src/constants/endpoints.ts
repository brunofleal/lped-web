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
            path: '/api/player',
            method: 'GET',
        },
    },
};

export default endpoints;
