import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { GlobalRouter } from './router';
import { LocalStoreWatcher } from './zustand/LocalStoreWatcher';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <>
            <LocalStoreWatcher />
            <RouterProvider router={GlobalRouter} />
        </>
    </StrictMode>
);
