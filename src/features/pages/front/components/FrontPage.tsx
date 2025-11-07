import { BackgroundCanvas } from '../../../background/components/BackgroundCanvas';
import { Header } from '../../../header/components/Header';
import { Loading } from '../../../loading/components/Loading';
import { LoadingProvider } from '../../../loading/context/LoadingContext';
import { IntroSection } from './sections/IntroSection';

import { motion } from 'motion/react';

export const FrontPage = () => {
    return (
        <LoadingProvider>
            <main className='page'>
                <div style={{ display: 'grid', zIndex: '1', }}>

                <Header />

                <Loading />
                <IntroSection />
                </div>

                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '0',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        zIndex: '0',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <BackgroundCanvas />
                </motion.div>
            </main>
        </LoadingProvider>
    );
};
