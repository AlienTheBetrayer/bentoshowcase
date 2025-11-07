import { Instance, Instances } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { InstancedMesh, Object3D } from 'three';
import { useCursorRef } from '../../../hooks/useCursorRef';

export const BackgroundParticles = () => {
    const pointer = useCursorRef();
    const three = useThree();
    const instancesRef = useRef<InstancedMesh>(null);
    const dummy = new Object3D();

    const particlesRow = 30;
    const gap = 0.4;

    useFrame((state) => {
        if (instancesRef.current) {
            const t = state.clock.getElapsedTime();

            let i = 0;
            for (
                let y = 0;
                y < Math.ceil(three.viewport.height / gap) + 1;
                y++
            ) {
                for (
                    let x = 0;
                    x < Math.ceil(three.viewport.width / gap) + 1;
                    x++
                ) {
                    dummy.position.set(
                        -three.viewport.width / 2 + x * gap,
                        -three.viewport.height / 2 + y * gap,
                        0
                    );
                    dummy.updateMatrix();
                    instancesRef.current.setMatrixAt(i++, dummy.matrix);
                }
            }
            instancesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <Instances ref={instancesRef}>
            <meshPhysicalMaterial color='#969696' />
            <sphereGeometry args={[0.03]} />

            {Array.from({ length: particlesRow * particlesRow }).map(
                (_, idx) => (
                    <Instance key={idx} />
                )
            )}
        </Instances>
    );
};
