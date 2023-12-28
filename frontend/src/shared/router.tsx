import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper/PageWrapper';
import EditPlayerPage from '../pages/EditPlayerPage/EditPlayerPage';
import HomePage from '../pages/HomePage/HomePage';
import SignupPage from '../pages/HomePage/SignupPage/SignupPage';
import ManagementPage from '../pages/ManagementPage/ManagementPage';
import PastSeasonsPage from '../pages/PastSeasonsPage/PastSeasonsPage';
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
                path: routes.SeasonsPage.path,
                element: <PastSeasonsPage />,
            },
            {
                path: routes.ManagementPage.path,
                element: <ManagementPage />,
            },
            {
                path: routes.EditPlayerPage.path,
                element: <EditPlayerPage />,
            },
            {
                path: routes.SignupPage.path,
                element: <SignupPage />,
            },
        ],
    },
]);

export default router;
