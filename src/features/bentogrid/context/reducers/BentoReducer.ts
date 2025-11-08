import type { BentoData } from '../types/BentoTypes';

export type BentoReducerAction = { type: 'SELECT_BLOCK'; idx: number | false };

export const BentoReducer = (
    state: BentoData,
    action: BentoReducerAction
): BentoData => {
    switch (action.type) {
        case 'SELECT_BLOCK':
            return { ...state, selectedIdx: action.idx };
    }
};
