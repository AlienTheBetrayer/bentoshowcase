import React, { useEffect } from 'react';
import type { BentoReducerAction } from '../reducers/BentoReducer';

export const useBentoHotkeys = (
    dispatch: React.Dispatch<BentoReducerAction>
) => {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    dispatch({ type: 'SELECT_BLOCK', idx: false });
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);
};
