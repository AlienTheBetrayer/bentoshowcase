import { PricingCards } from '../../../pricingcards/components/PricingCards';
import './CardsSection.css';

export const CardsSection = () => {
    return (
        <section className='section cards-section'>
            <div className='info'>
                <h2>Pricing</h2>
                <p>
                    <b>Detailed information</b> about our <mark>pricings</mark>{' '}
                    and what you can do with them. (<b>contact</b> us if you want to get more info)
                </p>
            </div>

            <PricingCards />
            <hr />
        </section>
    );
};
