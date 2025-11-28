export interface PricingCardType {
    title: string;
    description: {
        usage: string;
        forWho: string;
    };
    price: string;
    className?: string;
    background?: string;
}