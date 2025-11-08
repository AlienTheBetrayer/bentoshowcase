import { Canvas } from '@react-three/fiber';
import './BentoGridCanvas.css';

import { Center, OrbitControls } from '@react-three/drei';
import { motion } from 'motion/react';
import { useCallback } from 'react';
import { BentoGridBlock } from './BentoGridBlock';

export interface BentoGridBoxType {
    position: [number, number, number];
    size: [number, number, number];
}

export const BentoGridCanvas = () => {
    // handling functions (preventing re-renders)
    const handlePointerEnter = useCallback(() => {
        document.body.style.cursor = 'pointer';
    }, []);

    const handlePointerLeave = useCallback(() => {
        document.body.style.cursor = 'default';
    }, []);

    // all the boxes
    const boxes: BentoGridBoxType[] = [
        {
            position: [-4, 7, 5],
            size: [2, 3, 2],
        },
        {
            position: [-6.1, 7, 5],
            size: [2, 3, 2],
        },
    ];


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
                <pointLight position={[-4, 7, 5]} intensity={128} />
                <hemisphereLight />

                <Center>
                    {boxes.map((box, idx) => (
                        <BentoGridBlock
                            box={box}
                            key={idx}
                            onPointerEnter={handlePointerEnter}
                            onPointerLeave={handlePointerLeave}
                        />
                    ))}
                </Center>

                <OrbitControls enableZoom={false} />
            </Canvas>
        </motion.div>
    );
};
