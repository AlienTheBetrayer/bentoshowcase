import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { motion } from 'motion/react';

export const usePopup = (element: React.ReactNode, onBackgroundClick?: () => void) => {
    const [isShown, setIsShown] = useState<boolean>(false);

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
                            }
                            }
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
