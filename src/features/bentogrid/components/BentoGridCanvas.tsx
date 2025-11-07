import { Canvas } from '@react-three/fiber';
import './BentoGridCanvas.css';

import { motion } from 'motion/react';

export const BentoGridCanvas = () => {
    return (
        <motion.div className='bento-grid-canvas-container'>
            <Canvas style={{ width: '100%', height: '100%' }}>
                
            </Canvas>
        </motion.div>
    );
};
