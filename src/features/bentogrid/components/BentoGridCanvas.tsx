import { Canvas } from '@react-three/fiber';
import './BentoGridCanvas.css';

import { OrbitControls, RoundedBox } from '@react-three/drei';
import { motion } from 'motion/react';
import { useState } from 'react';

export const BentoGridCanvas = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    return (
        <motion.div className='bento-grid-canvas-container'>
            <Canvas
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                }}
                camera={{
                    position: [0, 0, 10],
                    fov: 45,
                }}
                gl={{ alpha: true }}
                onPointerDown={() => setIsDragging(true)}
                onPointerLeave={() => setIsDragging(false)}
                onPointerUp={() => setIsDragging(false)}
            >
                <pointLight position={[-4, 7, 5]} intensity={128} />
                <hemisphereLight />

                <RoundedBox position={[0, 0, 0]} args={[3, 6, 3]}>
                    <meshPhysicalMaterial />
                </RoundedBox>

                <OrbitControls enableZoom={false} />
            </Canvas>
        </motion.div>
    );
};
