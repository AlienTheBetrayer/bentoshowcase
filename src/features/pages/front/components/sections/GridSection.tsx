import gsap from 'gsap';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BentoGridCanvas } from '../../../../bentogrid/components/BentoGridCanvas';
import { BentoSelectedCard } from '../../../../bentogrid/components/BentoSelectedCard';
import { useBentoContext } from '../../../../bentogrid/context/BentoContext';
import { useLoadingContext } from '../../../../loading/context/LoadingContext';
import './GridSection.css';

export const GridSection = () => {
    const [loadingState] = useLoadingContext();
    const [state, dispatch] = useBentoContext();

    useEffect(() => {
        if (loadingState.hasHeaderFinished) {
            gsap.to('.grid-section', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1,
                ease: 'circ.inOut',
            });
        } else {
            gsap.to('.grid-section', {
                opacity: 0,
                y: 200,
                duration: 0,
            });
        }
    }, [loadingState.hasHeaderFinished]);

    useEffect(() => {}, [state.selectedIdx]);

    return (
        <section className='section grid-section' style={{ marginTop: '4rem' }}>
            {createPortal(
                <AnimatePresence>
                    {state.selectedIdx !== false && (
                        <BentoSelectedCard
                            card={
                                state.boxes.find(
                                    (box) => box.idx === state.selectedIdx
                                )?.content!
                            }
                        />
                    )}
                </AnimatePresence>,
                document.body
            )}

            <div className='grid-section-border'>
                <BentoGridCanvas />
            </div>
        </section>
    );
};
