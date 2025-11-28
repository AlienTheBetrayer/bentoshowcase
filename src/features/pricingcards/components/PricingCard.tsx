import { Button } from '../../ui/Button/components/Button';
import type { PricingCardType } from '../types/card';
import './PricingCard.css';

interface Props {
    card: PricingCardType;
}

export const PricingCard = ({ card }: Props) => {
    return (
        <li className={`pricing-card ${card.className ?? ''}`}>
            <h4 dangerouslySetInnerHTML={{ __html: card.title }} />

            <p dangerouslySetInnerHTML={{ __html: card.description.usage }} />
            <p dangerouslySetInnerHTML={{ __html: card.description.forWho }} />

            <div className='pricing-card-action'>
                <Button className='pricing-card-action-button'>Order</Button>
                <p>{card.price}</p>
            </div>

            {/* background / effects */}
            {card.background && (
                <span className='pricing-card-bg'>{card.background}</span>
            )}

            {card.className === 'business-card' && (
                <div className='business-card-selection' />
            )}
        </li>
    );
};
