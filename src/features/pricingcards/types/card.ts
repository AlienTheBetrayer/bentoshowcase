export interface PricingCardType {
    title: string;
    description: {
        usage: string;
        forWho: string;
    };
    price: number;
}