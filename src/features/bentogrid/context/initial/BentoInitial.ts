import type { BentoData } from '../types/BentoTypes';

export const BentoInitial: BentoData = {
    selectedIdx: false,
    boxes: [
        {
            idx: 0,
            position: [-4, 7, 5],
            size: [2, 3, 2],
            content: {
                title: 'hi',
                description: 'bye',
            },
        },
        {
            idx: 1,
            position: [-6.1, 7, 5],
            size: [2, 3, 2],
            content: {
                title: 'hello world',
                description: 'very professional',
            },
        },
    ],
};
