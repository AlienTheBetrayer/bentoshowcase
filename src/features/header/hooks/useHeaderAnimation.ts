import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import { headerSize } from '../components/Header';

export const useHeaderAnimation = () => {
    const [loadingState, setLoadingState] = useLoadingContext();

    useGSAP(() => {
        if (loadingState.hasHeaderFinished) {
            gsap.to('header', {
                xPercent: -50,
                y: 0,
                maxWidth: `${headerSize}px`,
                duration: 0,
            });
            return;
        }

        if (!loadingState.hasInitialFinished) {
            gsap.to('header', {
                y: -100,
                xPercent: -50,
                duration: 0,
                maxWidth: `${headerSize / 2}px`,
            });
            return;
        }

        gsap.timeline()
            .to('header', {
                xPercent: -50,
                y: 0,
                duration: 0.75,
            })
            .to('header', {
                maxWidth: '70vw',
                duration: 0.75,
                ease: 'circ.inOut',
            })
            .to('header', {
                maxWidth: `${headerSize}px`,
                duration: 0.75,
                ease: 'circ.inOut',
                onComplete: () =>
                    setLoadingState((prev) => ({
                        ...prev,
                        hasHeaderFinished: true,
                    })),
            });
    }, [loadingState.hasInitialFinished, loadingState.hasHeaderFinished]);
};
