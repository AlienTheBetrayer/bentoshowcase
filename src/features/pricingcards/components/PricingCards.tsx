import { motion } from 'motion/react';
import { PricingCardsData } from '../utils/cardData';
import { PricingCard } from './PricingCard';
import './PricingCards.css';

export const PricingCards = () => {
    return (
        <>
            <motion.ul
                className='pricing-cards'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
            >
                <div className='cards-container'>
                    {PricingCardsData.map((card, idx) => (
                        <PricingCard card={card} key={idx} />
                    ))}
                </div>
            </motion.ul>
        </>
    );
};
