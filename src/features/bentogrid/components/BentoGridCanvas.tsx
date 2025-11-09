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

    // hover edges
    const selectedRef = useRef<number | false>(false);
    const [selectedOnce, setSelectedOnce] = useState<boolean>(false);

    // handling functions (preventing re-renders)
    const handlePointerEnter = useCallback((idx: number) => {
        if (selectedOnce === false) setSelectedOnce(true);
        document.body.style.cursor = 'pointer';
        selectedRef.current = idx;
    }, []);

    const handlePointerLeave = useCallback(() => {
        document.body.style.cursor = 'auto';
        selectedRef.current = false;
    }, []);

    const handleClick = useCallback((idx: number) => {
        dispatch({ type: 'SELECT_BLOCK', idx: idx });
    }, []);

    // theme
    const { theme } = useLocalStore();

    return (
        <motion.div className='bento-grid-canvas-container'>
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
                <pointLight position={[-3, 5, 3]} intensity={256} />
                <ambientLight intensity={0.1} />

                <Center>
                    {state.boxes.map((box) => (
                        <BentoGridBlock
                            box={box}
                            key={box.idx}
                            onPointerEnter={handlePointerEnter}
                            onPointerLeave={handlePointerLeave}
                            onClick={handleClick}
                            theme={theme}
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
