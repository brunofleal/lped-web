
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
    SeasonsPage: {
        path: '/seasons',
    },
    ManagementPage: {
        path: '/management',
    },
    SignupPage: {
        path: '/signup',
    },
};

export default routes;
