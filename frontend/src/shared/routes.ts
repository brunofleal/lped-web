const routes = {
    HomePage: {
        path: '/',
    },
    PlayersPage: {
        path: '/players',
    },
    EditPlayerPage: {
        path: '/player/:id',
        pathParam: {
            id: ':id',
        },
    },
    TeamsPage: {
        path: '/teams',
    },
    ManagementPage: {
        path: '/management',
    },
};

export default routes;
