import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import './BackgroundCanvas.css';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useCursorRef } from '../../../hooks/useCursorRef';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useLocalStore } from '../../../zustand/localStore';
import { BackgroundLight } from './BackgroundLight';
import { BackgroundParticles } from './BackgroundParticles';

export const BackgroundCanvas = () => {
    const pointer = useCursorRef({ x: 200, y: 600 });
    const { theme } = useLocalStore();

    // lag optimization
    const isMobile = useMediaQuery(640);
    const performanceTimeout = useRef<number | false>(false);
    const [isLagging, setIsLagging] = useState<boolean>(false);
    const [isLaggingDisabled, setIsLaggingDisabled] = useState<boolean>(false);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {theme === 'dark' &&
                isLagging &&
                !isMobile &&
                !isLaggingDisabled && (
                    <motion.button
                        className='background-fps-warning'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsLaggingDisabled(true)}
                    >
                        <p>
                            <small>
                                Effects <u>reduced!</u>
                            </small>
                        </p>
                    </motion.button>
                )}

            <Canvas
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            >
                {theme === 'dark' &&
                    !isMobile &&
                    (!isLagging || isLaggingDisabled) && (
                        <EffectComposer>
                            <Bloom
                                emissiveThreshold={0}
                                emissiveIntensity={64}
                            />
                        </EffectComposer>
                    )}

                <BackgroundParticles
                    pointer={pointer}
                    onFpsChange={(fps) => {
                        if (fps < 20) {
                            performanceTimeout.current = setTimeout(
                                () => setIsLagging(true),
                                3000
                            );
                        } else if (performanceTimeout.current !== false) {
                            clearTimeout(performanceTimeout.current);
                            performanceTimeout.current = false;
                        }
                    }}
                />
                <BackgroundLight pointer={pointer} />
            </Canvas>
        </div>
    );
};
