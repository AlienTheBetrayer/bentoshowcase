import type { PricingCardType } from '../types/card';

export const PricingCardsData: PricingCardType[] = [
    {
        title: 'Starter',
        description: {
            usage: 'Basic access for individuals exploring the platform.',
            forWho: 'Perfect for beginners or casual users.',
        },
        price: 0,
    },
    {
        title: 'Pro',
        description: {
            usage: 'Enhanced tools and priority performance for daily use.',
            forWho: 'Ideal for freelancers and growing creators.',
        },
        price: 9,
    },
    {
        title: 'Business',
        description: {
            usage: 'Advanced features, collaboration, and extended limits.',
            forWho: 'Designed for teams and small companies.',
        },
        price: 29,
    },
    {
        title: 'Elite',
        description: {
            usage: 'Maximum performance, premium features, and priority support.',
            forWho: 'Built for organizations that require the highest reliability.',
        },
        price: 99,
    },
];
