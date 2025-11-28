import { useLoadingContext } from '../../loading/context/LoadingContext';
import './Header.css';

import { motion } from 'motion/react';
import { useLocalStore } from '../../../zustand/localStore';
import { LinkButton } from '../../ui/LinkButton/components/LinkButton';
import { ToggleButton } from '../../ui/ToggleButton/components/ToggleButton';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

export const headerSize = 256;

export const Header = () => {
    const [loadingState] = useLoadingContext();
    const { theme, toggleTheme } = useLocalStore();

    useHeaderAnimation();

    return (
        <motion.header
            whileHover={
                loadingState.hasHeaderFinished
                    ? { maxWidth: `${headerSize + 24}px` }
                    : {}
            }
        >
            <nav>
                <LinkButton to='/home'>Home</LinkButton>
                <LinkButton to='/pricing'>Pricing</LinkButton>
                <ToggleButton
                    value={theme !== 'dark'}
                    onChange={() => toggleTheme()}
                    style={{ marginLeft: 'auto' }}
                />
            </nav>
        </motion.header>
    );
};
