import { Canvas } from '@react-three/fiber';
import { BackgroundParticles } from './BackgroundParticles';

export const BackgroundCanvas = () => {
    return (
        <Canvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <hemisphereLight/>

            <BackgroundParticles />
        </Canvas>
    );
};
