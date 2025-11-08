import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import type { BentoGridBox } from '../../context/types/BentoTypes';

interface Props {
    box: BentoGridBox;
}

export const BentoSelectedCardReplica = ({ box }: Props) => {
    const boxRef = useRef<Mesh>(null);

    useFrame(state => {
        if(boxRef.current) {
            const t = state.clock.getElapsedTime();

            // rotation
            boxRef.current.rotation.y += 0.01;
            boxRef.current.rotation.x = Math.sin(t) / 10;

            // scale
            const scale = 1 + Math.sin(t) / 10; 
            boxRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <mesh ref={boxRef} position={[0, 0, 0]}>
            <boxGeometry
                args={box.size}
            />
            <meshNormalMaterial />
        </mesh>
    );
};
