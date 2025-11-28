import type { PricingCardType } from '../types/card';

export const PricingCardsData: PricingCardType[] = [
    {
        title: '<mark>Starter</mark>',
        description: {
            usage: 'Basic access for individuals exploring the platform with our <mark>core features</mark>.',
            forWho: 'Perfect for <b>beginners</b> or casual users.',
        },
        price: 'FREE',
        background: 'S',
    },
    {
        title: 'Pro',
        description: {
            usage: 'Enhanced tools and priority performance for <mark>everyday productivity</mark>.',
            forWho: 'Ideal for <b>freelancers</b> and growing creators seeking more control.',
        },
        price: '8.99$',
        background: 'P',
    },
    {
        title: '<mark>Business</mark> Suite',
        description: {
            usage: 'Advanced capabilities, team collaboration, and <mark>extended resource limits</mark>.',
            forWho: 'Designed for <b>teams</b> and small companies needing reliability.',
        },
        price: '28.99$',
        className: 'business-card',
        background: '$',
    },
    {
        title: 'Elite',
        description: {
            usage: 'Maximum performance, premium features, and <mark>priority-level support</mark>.',
            forWho: 'Built for organizations requiring <b>unmatched stability</b>.',
        },
        price: '98.99$',
        background: 'E',
    },
];
