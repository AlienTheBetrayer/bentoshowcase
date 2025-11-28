import { AnimatePresence, motion } from 'motion/react';
import { useLoadingContext } from '../context/LoadingContext';
import { useLoadingAnimation } from '../hooks/useLoadingAnimation';
import './Loading.css';

export const chunkQuantity: number = 6;

export const Loading = () => {
    const [loadingState] = useLoadingContext();

    useLoadingAnimation();

    return (
        <AnimatePresence>
            <>
                <LoadingBackground />
                {!loadingState.hasInitialFinished && (
                    <motion.div
                        className='loading-container'
                        exit={{ opacity: 0 }}
                    >
                        {Array.from({ length: chunkQuantity }).map((_, idx) => (
                            <div className='loading-chunk' key={idx}>
                                <div className='loading-element'></div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </>
        </AnimatePresence>
    );
};

export const LoadingBackground = () => {
    const [loadingState] = useLoadingContext();

    return (
        <motion.div
            className='loading-background'
            initial={{ opacity: 1 }}
            animate={{
                opacity: loadingState.hasInitialFinished ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        />
    );
};
