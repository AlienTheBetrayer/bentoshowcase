import { motion } from 'motion/react';
import { Button } from '../../ui/Button/components/Button';
import type { BentoGridBoxContent } from '../context/types/BentoTypes';
import './BentoSelectedCard.css';

interface Props {
    card: BentoGridBoxContent;
    onInteract?: () => void;
}

export const BentoSelectedCard = ({ card, onInteract }: Props) => {
    return (
        <motion.div
            className='bento-selected-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onInteract?.()}
        >
            <motion.div className='bento-selected-card'>
                <div className='bento-selected-card-topline'>
                    <h4>{card.title}</h4>
                    <Button style={{ marginLeft: 'auto' }} onClick={() => onInteract?.()}>✕</Button>
                </div>

                <div className='bento-selected-card-main'>
                    <p>{card.description}</p>
                </div>
            </motion.div>

            <motion.div className='bento-selected-card bento-selected-card-content'>
                <div className='bento-selected-card-topline'>
                    <h4>{card.title}</h4>
                    <Button style={{ marginLeft: 'auto' }} onClick={() => onInteract?.()}>✕</Button>
                </div>

                <div className='bento-selected-card-main'>
                    <p>{card.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};
