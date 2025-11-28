import type React from 'react';
import { LoadingProvider } from '../../loading/context/LoadingContext';

interface Props {
    children?: React.ReactNode;
}

export const Page = ({ children }: Props) => {
    return (
        <LoadingProvider>
            <main className='page'>
                {children}
            </main>
        </LoadingProvider>
    );
};
