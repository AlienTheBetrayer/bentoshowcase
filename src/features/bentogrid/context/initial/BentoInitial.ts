import type { BentoData } from '../types/BentoTypes';

export const BentoInitial: BentoData = {
    selectedIdx: false,
    boxes: [
        {
            idx: 1,
            position: [2, 0, 1],
            size: [2, 2, 4],
            content: {
                title: 'Vision',
                description:
                    'A space where ideas take form through <b>design</b>, motion, and interaction. Each concept leaves a <mark>subtle trace</mark> of inspiration.',
            },
        },
        {
            idx: 2,
            position: [0, 0, 2],
            size: [2, 2, 2],
            content: {
                title: 'Craft',
                description:
                    'Work shaped with intention and <b>precision</b>. Every detail refined, avoiding the pitfalls of <u>overcomplication</u> while keeping clarity.',
            },
        },

        {
            idx: 3,
            position: [2, 2, 1],
            size: [2, 2, 2],
            content: {
                title: 'Pulse',
                description:
                    'Experiments built around interaction, rhythm, and flow—projects that reveal the <mark>energy</mark> behind motion.',
            },
        },

        {
            idx: 5,
            position: [0, 2, 2],
            size: [2, 2, 2],
            content: {
                title: 'Echo',
                description:
                    'Concepts that return in new forms—iterations, callbacks, and ideas that <b>resonate</b> long after the first impression.',
            },
        },

        {
            idx: 6,
            position: [2, 4, 1],
            size: [2, 2, 4],
            content: {
                title: 'Forge',
                description:
                    'Behind-the-scenes builds and prototypes. A place where ideas undergo <u>trial and error</u> before becoming polished.',
            },
        },

        {
            idx: 7,
            position: [0, 4, 2],
            size: [2, 2, 2],
            content: {
                title: 'Spark',
                description:
                    'Lightweight explorations that ignite larger concepts—moments of curiosity marked with a <mark>hint of discovery</mark>.',
            },
        },

        {
            idx: 8,
            position: [0, 2, 0],
            size: [2, 6, 2],
            content: {
                title: 'Flow',
                description:
                    'Long-form experiments and continuous pieces shaped by movement. Designed to feel smooth, adaptive, and <b>effortlessly connected</b>.',
            },
        },
    ],
};
