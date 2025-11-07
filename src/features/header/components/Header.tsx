import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import './Header.css';

import { motion } from 'motion/react';
import { LinkButton } from '../../ui/LinkButton';

export const Header = () => {
    const [loadingState, setLoadingState] = useLoadingContext();

    useGSAP(() => {
        if (loadingState.hasHeaderFinished) return;

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
                maxWidth: '750px',
                duration: 0.75,
                ease: 'circ.inOut',
            })
            .to('header', {
                maxWidth: '200px',
                duration: 0.75,
                ease: 'circ.inOut',
                onComplete: () =>
                    setLoadingState((prev) => ({
                        ...prev,
                        hasHeaderFinished: true,
                    })),
            });
    }, [loadingState.hasInitialFinished, loadingState.hasHeaderFinished]);

    return (
        <motion.header
            whileHover={
                loadingState.hasHeaderFinished ? { maxWidth: '210px' } : {}
            }
        >
            <nav>
                <LinkButton to='/home'>
                Home
                </LinkButton>
            </nav>
        </motion.header>
    );
};
