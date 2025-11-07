import { Instance, Instances } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { InstancedMesh, Object3D } from 'three';
import { useCursorRef } from '../../../hooks/useCursorRef';

import { ImprovedNoise } from 'three/examples/jsm/Addons.js';

const noise = new ImprovedNoise();

interface Props {
    pointer: ReturnType<typeof useCursorRef>;
}

export const BackgroundParticles = ({ pointer }: Props) => {
    const three = useThree();
    const instancesRef = useRef<InstancedMesh>(null);
    const dummy = new Object3D();

    const gap = 0.2;
    const size = useMemo(() => {
        return {
            rows: Math.ceil(three.viewport.height / gap) + 1,
            columns: Math.ceil(three.viewport.width / gap) + 1,
        };
    }, [gap, three.viewport.width, three.viewport.height]);

    useFrame((state) => {
        if (instancesRef.current) {
            const t = state.clock.getElapsedTime();
            const internalPointer = {
                x:
                    (pointer.smoothed.current.x.get() / three.size.width) *
                        three.viewport.width -
                    three.viewport.width / 2,
                y: -(
                    (pointer.smoothed.current.y.get() / three.size.height) *
                        three.viewport.height -
                    three.viewport.height / 2 +
                    window.scrollY
                ),
            };

            let i = 0;
            for (let iy = 0; iy < size.rows; iy++) {
                for (let ix = 0; ix < size.columns; ix++) {
                    // positions
                    const x = -three.viewport.width / 2 + ix * gap;
                    const y = -three.viewport.height / 2 + iy * gap;
                    const n = noise.noise(x * 0.3, y * 0.3, t * 0.3) * 5;
                    dummy.position.set(x + n * 0.05, y + n * 0.05, n * 0.05);

                    // cursor scaling
                    const dx = internalPointer.x - x;
                    const dy = internalPointer.y - y;
                    const m = Math.sqrt(dx * dx + dy * dy);

                    if (m < 3) {
                        const dm = 3 - m / 1;
                        const n = noise.noise(x, y, t) * 5;
                        dummy.scale.set(1 + dm * n, 1 + dm * n, 1 + dm * n);
                        dummy.position.set(x, y, n * 0.05);
                    } else {
                        dummy.scale.set(1, 1, 1);
                    }

                    dummy.updateMatrix();
                    instancesRef.current.setMatrixAt(i++, dummy.matrix);
                }
            }
            instancesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <Instances ref={instancesRef} limit={100000}>
            <meshPhysicalMaterial color='#969696' />
            <sphereGeometry args={[0.01]} />

            {Array.from({ length: size.columns * size.rows }).map((_, idx) => (
                <Instance key={idx} />
            ))}
        </Instances>
    );
};
