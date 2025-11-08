import { Canvas } from '@react-three/fiber';
import './BentoGridCanvas.css';

import { RoundedBox } from '@react-three/drei';
import { motion } from 'motion/react';

export const BentoGridCanvas = () => {
    return (
        <motion.div className='bento-grid-canvas-container'>
            <Canvas
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                }}
                gl={{ alpha: true }}
            >
                <pointLight position={[0, 0, 0]} intensity={128} />

                <RoundedBox position={[0, 0, 0]} args={[3, 6, 3]}>
                    <meshPhysicalMaterial />
                </RoundedBox>
            </Canvas>
        </motion.div>
    );
};
