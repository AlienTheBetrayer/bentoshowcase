import React, { createContext, useContext, useReducer } from 'react';
import { useBentoHotkeys } from './hooks/useBentoHotkeys';
import { BentoInitial } from './initial/BentoInitial';
import { BentoReducer, type BentoReducerAction } from './reducers/BentoReducer';
import type { BentoData } from './types/BentoTypes';

type BentoContextType = [BentoData, React.Dispatch<BentoReducerAction>];

export const BentoContext = createContext<BentoContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const BentoProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(BentoReducer, BentoInitial);

    useBentoHotkeys(dispatch);

    return (
        <BentoContext.Provider value={[state, dispatch]}>
            {children}
        </BentoContext.Provider>
    );
};

export const useBentoContext = () => {
    const ctx = useContext(BentoContext);
    if (!ctx) throw new Error('useBentoContext() is used incorrectly.');
    return ctx;
};
