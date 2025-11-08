import { motion } from 'motion/react';
import type { BentoGridBoxContent } from '../context/types/BentoTypes';
import './BentoSelectedCard.css';

interface Props {
    card: BentoGridBoxContent;
}

export const BentoSelectedCard = ({ card }: Props) => {
    return (
        <motion.div
            className='bento-selected-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className='bento-selected-card'>
                <div className='bento-selected-card-topline'>
                    <h4>{card.title}</h4>
                </div>

                <div className='bento-selected-card-main'>
                    <p>{card.description}</p>
                </div>
            </motion.div>

            <motion.div className='bento-selected-card bento-selected-card-content'>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
            </motion.div>
        </motion.div>
    );
};
