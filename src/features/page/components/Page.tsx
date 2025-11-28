import type React from 'react';
import { LoadingProvider } from '../../loading/context/LoadingContext';

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const Page = ({ children, className }: Props) => {
    return (
        <LoadingProvider>
            <main className={`page ${className ?? ''}`}>{children}</main>
        </LoadingProvider>
    );
};
