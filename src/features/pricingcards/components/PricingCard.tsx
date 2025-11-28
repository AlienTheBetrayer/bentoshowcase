import type { PricingCardType } from '../types/card';
import './PricingCard.css';

interface Props {
    card: PricingCardType;
}

export const PricingCard = ({ card }: Props) => {
    return (
        <li className='pricing-card'>
            <h4 dangerouslySetInnerHTML={{ __html: card.title }}/>

            <p dangerouslySetInnerHTML={{ __html: card.description.usage }} />
            <p dangerouslySetInnerHTML={{ __html: card.description.forWho }} />

            <p style={{ marginTop: 'auto', textAlign: 'right' }}>
                {card.price.toFixed(2)}$
            </p>
        </li>
    );
};
