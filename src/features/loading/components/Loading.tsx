import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../context/LoadingContext';
import './Loading.css';

const chunkQuantity: number = 6;

export const Loading = () => {
    const [loadingState, setLoadingState] = useLoadingContext();

    useGSAP(() => {
        if (loadingState.hasInitialFinished) return;

        gsap.to('.loading-element', {
            opacity: 0,
            yPercent: 50,
            duration: 0,
        });

        gsap.timeline()
            .to('.loading-element', {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.inOut',
            })
            .to('.loading-chunk', {
                xPercent: -(chunkQuantity - 1) * 100,
                duration: 3,
                ease: 'power2.inOut',
            })
            .to('.loading-element', {
                width: '33vw',
                height: '33vw',
                borderRadius: '12vw',
                duration: 1,
                ease: 'circ.inOut',
            })
            .to('.loading-element', {
                borderRadius: '0vw',
                width: '100vw',
                height: '100vh',
                duration: 1,
                ease: 'circ.inOut',
            })
            .to('.loading-container', {
                opacity: 0,
                duration: 1,
                onComplete: () =>
                    setLoadingState((prev) => ({
                        ...prev,
                        hasInitialFinished: true,
                    })),
            });
    }, []);

    return (
        !loadingState.hasInitialFinished && (
            <div className='loading-container'>
                {Array.from({ length: chunkQuantity }).map((_, idx) => (
                    <div className='loading-chunk' key={idx}>
                        <div className='loading-element'></div>
                    </div>
                ))}
            </div>
        )
    );
};
