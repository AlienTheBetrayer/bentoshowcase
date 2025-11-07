import React, { createContext, useContext, useState } from 'react';

export interface LoadingData {
    hasInitialFinished: boolean;
    hasHeaderFinished: boolean;
}

type LoadingContextType = [
    LoadingData,
    React.Dispatch<React.SetStateAction<LoadingData>>
];

export const LoadingContext = createContext<LoadingContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const LoadingProvider = ({ children }: Props) => {
    const [state, setState] = useState<LoadingData>({
        hasInitialFinished: false,
        hasHeaderFinished: false,
    });

    return (
        <LoadingContext.Provider value={[state, setState]}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error('useLoadingContext() is not used correctly.');
    return ctx;
};
