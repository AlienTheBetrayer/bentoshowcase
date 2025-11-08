import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion } from 'motion/react';

export const usePopup = (
    element: React.ReactNode,
    onBackgroundClick?: () => void
) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {
        if (isShown) {
            const handle = (e: WheelEvent | TouchEvent) => {
                e.preventDefault();
            };

            const handleKey = (e: KeyboardEvent) => {
                if (
                    [
                        'Space',
                        'PageUp',
                        'PageDown',
                        'ArrowUp',
                        'ArrowDown',
                        'Home',
                        'End',
                    ].includes(e.code)
                ) {
                    e.preventDefault();
                }
            };

            document.addEventListener('wheel', handle, { passive: false });
            document.addEventListener('touchmove', handle, { passive: false });
            document.addEventListener('keydown', handleKey);

            return () => {
                document.removeEventListener('wheel', handle);
                document.removeEventListener('touchmove', handle);
                document.removeEventListener('keydown', handleKey);
            };
        }
    }, [isShown]);

    const render = () => {
        return createPortal(
            <>
                <AnimatePresence>{isShown && element}</AnimatePresence>
                <AnimatePresence>
                    {isShown && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                inset: '0',
                                backdropFilter: 'blur(4px)',
                                background: '#0000003c',
                                zIndex: 100,
                            }}
                            onClick={() => {
                                setIsShown(false);
                                onBackgroundClick?.();
                            }}
                        />
                    )}
                </AnimatePresence>
            </>,

            document.body
        );
    };

    return {
        isShown,
        setIsShown,
        render,
    };
};
