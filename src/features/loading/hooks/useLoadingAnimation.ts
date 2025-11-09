import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { chunkQuantity } from '../components/Loading';
import { useLoadingContext } from '../context/LoadingContext';

export const useLoadingAnimation = () => {
    const [loadingState, setLoadingState] = useLoadingContext();

    useGSAP(() => {
        setLoadingState((prev) => ({
            ...prev,
            hasInitialFinished: true,
        }));

        if (loadingState.hasInitialFinished) return;

        gsap.to('.loading-element', {
            opacity: 0,
            yPercent: 25,
            duration: 0,
        });

        gsap.timeline()
            .to('.loading-element', {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                delay: 0.5,
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
            .to('.loading-element', {
                opacity: 0,
                duration: 1,
                onComplete: () =>
                    setLoadingState((prev) => ({
                        ...prev,
                        hasInitialFinished: true,
                    })),
            });
    }, []);
};
