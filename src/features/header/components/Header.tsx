import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import './Header.css';

export const Header = () => {
    const [loadingState] = useLoadingContext();

    useGSAP(() => {
        if (!loadingState.hasInitialFinished) {
            gsap.to('header', {
                y: -100,
                duration: 0,
            });
            return;
        }

        gsap.timeline()
            .to('header', {
                y: 0,
                duration: 0.75,
            })
            .to('header', {
                maxWidth: '1000px',
                duration: 0.75,
                ease: 'circ.inOut',
            })
            .to('header', {
                maxWidth: '200px',
                duration: 0.75,
                ease: 'circ.inOut',
            });
    }, [loadingState.hasInitialFinished]);

    return (
        <header>
            <nav></nav>
        </header>
    );
};
