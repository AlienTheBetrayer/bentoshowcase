import gsap from 'gsap';
import { useEffect } from 'react';
import { usePopup } from '../../../../../hooks/usePopup';
import { BentoGridCanvas } from '../../../../bentogrid/components/BentoGridCanvas';
import { BentoSelectedCard } from '../../../../bentogrid/components/selected/BentoSelectedCard';
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

    const cardPopup = usePopup(
        <BentoSelectedCard
            onInteract={() => dispatch({ type: 'SELECT_BLOCK', idx: false })}
            box={state.boxes.find((box) => box.idx === state.selectedIdx)}
        />,
        () => dispatch({ type: 'SELECT_BLOCK', idx: false })
    );

    useEffect(() => {
        cardPopup.setIsShown(state.selectedIdx !== false);
    }, [state.selectedIdx]);

    return (
        <section className='section grid-section' style={{ marginTop: '4rem' }}>
            {cardPopup.render()}

            <div className='grid-section-border'>
                <BentoGridCanvas />
            </div>
        </section>
    );
};
