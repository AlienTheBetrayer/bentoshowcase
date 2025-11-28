import { BackgroundCanvas } from '../../../background/components/BackgroundCanvas';
import { BentoProvider } from '../../../bentogrid/context/BentoContext';
import { Header } from '../../../header/components/Header';
import { Loading } from '../../../loading/components/Loading';
import './FrontPage.css';
import { GridSection } from './sections/GridSection';
import { IntroSection } from './sections/IntroSection';

import { motion } from 'motion/react';
import { Footer } from '../../../footer/components/Footer';
import { Page } from '../../../page/components/Page';
import { StackSection } from './sections/StackSection';

export const FrontPage = () => {
    return (
        <Page>
            <BentoProvider>
                <div style={{ display: 'grid', zIndex: '1', gap: '4rem' }}>
                    <Loading />

                    <Header />

                    <IntroSection />
                    <GridSection />
                    <StackSection />

                    <div style={{ marginTop: '6rem' }} />
                    <Footer />
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
            </BentoProvider>
        </Page>
    );
};
