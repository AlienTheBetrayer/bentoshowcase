import gsap from 'gsap';
import { useEffect } from 'react';
import { BentoGridCanvas } from '../../../../bentogrid/components/BentoGridCanvas';
import { useLoadingContext } from '../../../../loading/context/LoadingContext';
import './GridSection.css';
import { useBentoContext } from '../../../../bentogrid/context/BentoContext';

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

    return (
        <section className='section grid-section' style={{ marginTop: '4rem' }}>
            <div className='grid-section-border'>
                <BentoGridCanvas />
            </div>
        </section>
    );
};
