import { Canvas } from '@react-three/fiber';
import './BentoGridCanvas.css';

import { Center, OrbitControls } from '@react-three/drei';
import { motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { useLocalStore } from '../../../zustand/localStore';
import { useBentoContext } from '../context/BentoContext';
import { BentoGridBlock } from './BentoGridBlock';
import { BentoGridSelection } from './BentoGridSelection';

export const BentoGridCanvas = () => {
    // state
    const [state, dispatch] = useBentoContext();

    // theme / zustand store
    const { theme } = useLocalStore();

    // hover edges
    const selectedRef = useRef<number | false>(false);
    const [selectedOnce, setSelectedOnce] = useState<boolean>(false);

    const clickTimeout = useRef<number>(-1);
    const canClick = useRef<boolean>(true);

    // block handlers
    const handlePointerEnter = useCallback((idx: number) => {
        if (selectedOnce === false) setSelectedOnce(true);
        document.body.style.cursor = 'pointer';
        selectedRef.current = idx;
    }, []);

    const handlePointerLeave = useCallback((_idx: number) => {
        document.body.style.cursor = 'auto';
        selectedRef.current = false;
    }, []);

    const handleClick = useCallback((idx: number) => {
        if (canClick.current === true)
            dispatch({ type: 'SELECT_BLOCK', idx: idx });
    }, []);

    // canvas handlers
    const handlePointerDown = useCallback(() => {
        clickTimeout.current = setTimeout(() => {
            canClick.current = false;
        }, 150);
    }, []);

    const handlePointerUp = useCallback(() => {
        clearTimeout(clickTimeout.current);
        if (canClick.current === false)
            setTimeout(() => {
                canClick.current = true;
            }, 50);
    }, []);

    return (
        <motion.div
            className='bento-grid-canvas-container'
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            
            <Canvas
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                }}
                camera={{
                    position: [0, 0, 10],
                    fov: 45,
                }}
                gl={{ alpha: true }}
            >
                <pointLight position={[-4, -2, 2]} intensity={500} />
                <pointLight position={[4, 2, -2]} intensity={500} />
                <hemisphereLight intensity={2} />

                <Center>
                    {state.boxes.map((box) => (
                        <BentoGridBlock
                            box={box}
                            key={box.idx}
                            onPointerEnter={handlePointerEnter}
                            onPointerLeave={handlePointerLeave}
                            onClick={handleClick}
                        />
                    ))}

                    {selectedOnce && (
                        <BentoGridSelection
                            boxes={state.boxes}
                            selectedRef={selectedRef}
                            theme={theme}
                        />
                    )}
                </Center>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </motion.div>
    );
};
