import { BackgroundCanvas } from '../../../background/components/BackgroundCanvas';
import { Header } from '../../../header/components/Header';
import { Loading } from '../../../loading/components/Loading';
import {
    LoadingProvider,
    useLoadingContext,
} from '../../../loading/context/LoadingContext';
import './FrontPage.css';
import { IntroSection } from './sections/IntroSection';

import { motion } from 'motion/react';

export const FrontPage = () => {
    return (
        <LoadingProvider>
            <main className='page'>
                <div style={{ display: 'grid', zIndex: '1' }}>
                    <FrontPageBackground />
                    <Loading />

                    <Header />
                    <IntroSection />
                </div>

                <motion.div
                    className='front-background-wrapper'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                >
                    <BackgroundCanvas />
                </motion.div>
            </main>
        </LoadingProvider>
    );
};

const FrontPageBackground = () => {
    const [loadingState] = useLoadingContext();

    return (
        <motion.div
            className='front-background-wrapper-overlay'
            initial={{ opacity: 1 }}
            animate={{
                opacity: loadingState.hasInitialFinished ? 0 : 1,
            }}
            transition={{ duration: 1 }}
        />
    );
};
