import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSessionStore } from '../../../zustand/sessionStore';

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

    const sessionStore = useSessionStore();

    // syncing session store with our state
    useEffect(() => {
        if (
            state.hasHeaderFinished &&
            state.hasInitialFinished &&
            !sessionStore.loaded
        ) {
            sessionStore.updateLoaded(true);
        }
    }, [state, sessionStore.loaded]);

    // syncing our state with the session store
    useEffect(() => {
        if (
            sessionStore.loaded &&
            !(state.hasHeaderFinished || state.hasInitialFinished)
        ) {
            setState((prev) => ({
                ...prev,
                hasHeaderFinished: true,
                hasInitialFinished: true,
            }));
        }
    }, [sessionStore.loaded]);

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
