import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useCursorRef } from '../../../hooks/useCursorRef';
import { BackgroundParticles } from './BackgroundParticles';
import { BackgroundLight } from './BackgroundLight';
import { useLocalStore } from '../../../zustand/localStore';

export const BackgroundCanvas = () => {
    const pointer = useCursorRef(
        { stiffness: 40, damping: 8 },
        { x: 200, y: 600 }
    );
    const { theme } = useLocalStore();

    return (
        <Canvas
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            { theme === 'dark' && (

                <EffectComposer>
                <Bloom emissiveThreshold={0} emissiveIntensity={64} />
            </EffectComposer>
            )}

            <BackgroundParticles pointer={pointer} />
            <BackgroundLight pointer={pointer} />
        </Canvas>
    );
};
