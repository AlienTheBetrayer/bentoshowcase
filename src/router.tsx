import { createBrowserRouter } from 'react-router-dom';

import { FrontPage } from './features/pages/front/components/FrontPage';

export const GlobalRouter = createBrowserRouter([
    // front page
    {
        path: '/',
        element: <FrontPage />,
    },
    {
        path: '/home',
        element: <FrontPage />,
    },
    {
        path: '/front',
        element: <FrontPage />,
    },
]);
