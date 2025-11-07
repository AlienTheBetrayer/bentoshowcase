import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import './Header.css';

export const Header = () => {
    const [loadingState] = useLoadingContext();

    useGSAP(() => {
        if (!loadingState.hasInitialFinished) return;

        gsap.timeline()
            .to('header', {
                maxWidth: '1000px',
                duration: 1,
                ease: 'power4.inOut',
            })
            .to('header', {
                maxWidth: '200px',
                duration: 1,
                ease: 'power4.inOut',
            });
    }, [loadingState.hasInitialFinished]);

    return (
        <header>
            <nav></nav>
        </header>
    );
};
