import { useGSAP } from '@gsap/react';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import { headerSize } from '../components/Header';
import gsap from 'gsap';

export const useHeaderAnimation = () => {
    const [loadingState, setLoadingState] = useLoadingContext();

    useGSAP(() => {
        if (loadingState.hasHeaderFinished) return;

        if (!loadingState.hasInitialFinished) {
            gsap.to('header', {
                y: -100,
                duration: 0,
                maxWidth: `${headerSize / 2}px`,
            });
            return;
        }

        gsap.timeline()
            .to('header', {
                y: 0,
                duration: 0.75,
            })
            .to('header', {
                maxWidth: '750px',
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
