import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../../../ui/Button/components/Button';
import type { BentoGridBox } from '../../context/types/BentoTypes';
import './BentoSelectedCard.css';
import { BentoSelectedCardCanvas } from './BentoSelectedCardCanvas';

import cursorImg from '../../assets/cursor.svg';

interface Props {
    box: BentoGridBox | undefined;
    onInteract?: () => void;
}

export const BentoSelectedCard = ({ box, onInteract }: Props) => {
    return (
        <AnimatePresence>
            {box !== undefined && (
                <motion.div
                    className='bento-selected-container'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className='bento-selected-card'
                        style={{ cursor: 'grab' }}
                    >
                        <img
                            src={cursorImg}
                            alt='hover'
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '1rem',
                                width: '1.5rem',
                                height: '1.5rem',
                                filter: 'invert(0.5)',
                            }}
                        />
                        <BentoSelectedCardCanvas box={box} />
                    </motion.div>

                    <motion.div className='bento-selected-card bento-selected-card-content'>
                        <div className='bento-selected-card-topline'>
                            <h4>{box.content.title}</h4>
                            <Button
                                style={{ marginLeft: 'auto' }}
                                onClick={() => onInteract?.()}
                            >
                                ✕
                            </Button>
                        </div>

                        <div className='bento-selected-card-main'>
                            <p>{box.content.description}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
