import { BackgroundCanvas } from '../../../background/components/BackgroundCanvas';
import { BentoProvider } from '../../../bentogrid/context/BentoContext';
import { Header } from '../../../header/components/Header';
import { Loading } from '../../../loading/components/Loading';
import {
    LoadingProvider,
    useLoadingContext,
} from '../../../loading/context/LoadingContext';
import './FrontPage.css';
import { GridSection } from './sections/GridSection';
import { IntroSection } from './sections/IntroSection';

import { motion } from 'motion/react';
import { StackSection } from './sections/StackSection';

export const FrontPage = () => {
    return (
        <LoadingProvider>
            <BentoProvider>
                <main className='page'>
                    <div style={{ display: 'grid', zIndex: '1', gap: '4rem' }}>
                        <FrontPageBackground />
                        <Loading />

                        <Header />
                        <IntroSection />
                        <GridSection />
                        <StackSection/>
                    </div>

                    <motion.div
                        className='front-background-wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 2 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <BackgroundCanvas />
                    </motion.div>
                </main>
            </BentoProvider>
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
