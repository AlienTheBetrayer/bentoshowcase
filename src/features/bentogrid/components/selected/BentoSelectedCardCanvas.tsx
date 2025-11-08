import { Center, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    ChromaticAberration,
    EffectComposer,
} from '@react-three/postprocessing';
import { ChromaticAberrationEffect } from 'postprocessing';
import React, { useEffect, useRef } from 'react';
import type { BentoGridBox } from '../../context/types/BentoTypes';
import { BentoSelectedCardReplica } from './BentoSelectedCardReplica';

interface Props {
    box: BentoGridBox;
}

export const BentoSelectedCardCanvas = ({ box }: Props) => {
    const isHoveredRef = useRef<boolean>(false);

    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            onPointerEnter={() => {
                isHoveredRef.current = true;
            }}
            onPointerLeave={() => {
                isHoveredRef.current = false;
            }}
        >
            <pointLight position={[3, 3, 3]} intensity={128} />

            <EffectComposer>
                <BentoSelectedCardCanvasAberration
                    isHoveredRef={isHoveredRef}
                />
            </EffectComposer>

            <Center>
                <BentoSelectedCardReplica box={box} />
            </Center>

            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

interface AberrationProps {
    isHoveredRef: React.RefObject<boolean>;
}

const BentoSelectedCardCanvasAberration = React.memo(
    ({ isHoveredRef }: AberrationProps) => {
        const aberrationRef = useRef<ChromaticAberrationEffect>(null);

        useEffect(() => {
            if (aberrationRef.current) {
                aberrationRef.current.offset.x = 0;
                aberrationRef.current.offset.y = 0;
            }
        }, []);

        useFrame(() => {
            const targetOffset = isHoveredRef.current ? 0.3 : 0;
            if (aberrationRef.current) {
                aberrationRef.current.offset.x +=
                    (targetOffset - aberrationRef.current.offset.x) * 0.1;
                aberrationRef.current.offset.y +=
                    (targetOffset - aberrationRef.current.offset.y) * 0.1;
            }
        });

        return <ChromaticAberration ref={aberrationRef} offset={[0, 0]} />;
    }
);
