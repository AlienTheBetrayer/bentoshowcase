import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLoadingContext } from '../../loading/context/LoadingContext';
import './Header.css';

import { motion } from 'motion/react';
import { useLocalStore } from '../../../zustand/localStore';
import { LinkButton } from '../../ui/LinkButton/components/LinkButton';
import { ToggleButton } from '../../ui/ToggleButton/components/ToggleButton';

const headerSize = 256;

export const Header = () => {
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

    const { theme, toggleTheme } = useLocalStore();

    return (
        <motion.header
            whileHover={
                loadingState.hasHeaderFinished
                    ? { maxWidth: `${headerSize + 10}px` }
                    : {}
            }
        >
            <nav>
                <LinkButton to='/home'>Home</LinkButton>
                <ToggleButton
                    value={theme !== 'dark'}
                    onChange={() => toggleTheme()}
                />
            </nav>
        </motion.header>
    );
};
