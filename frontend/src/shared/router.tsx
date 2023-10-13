import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper/PageWrapper';
import HomePage from '../pages/HomePage/HomePage';
import ManagementPage from '../pages/ManagementPage/ManagementPage';
import PlayersPage from '../pages/PlayersPage/PlayersPage';
import TeamsPage from '../pages/TeamsPage/TeamsPage';
import routes from './routes';

const router = createBrowserRouter([
    {
        element: <PageWrapper />,
        children: [
            {
                path: routes.HomePage.path,
                element: <HomePage />,
            },
            {
                path: routes.PlayersPage.path,
                element: <PlayersPage />,
            },
            {
                path: routes.TeamsPage.path,
                element: <TeamsPage />,
            },
            {
                path: routes.ManagementPage.path,
                element: <ManagementPage />,
            },
        ],
    },
]);

export default router;
