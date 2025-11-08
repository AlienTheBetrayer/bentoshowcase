import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { PointLight } from 'three';
import type { useCursorRef } from '../../../hooks/useCursorRef';

interface Props {
    pointer: ReturnType<typeof useCursorRef>;
}

export const BackgroundLight = ({ pointer }: Props) => {
    const lightRef = useRef<PointLight>(null);
    const three = useThree();

    useFrame((state) => {
        if (lightRef.current) {
            const t = state.clock.getElapsedTime();
            const internalPointer = {
                x:
                    (pointer.cursor.current.x / three.size.width) *
                        three.viewport.width -
                    three.viewport.width / 2,
                y: -(
                    ((pointer.cursor.current.y + window.scrollY) / three.size.height) *
                        three.viewport.height -
                    three.viewport.height / 2
                ),
            };

            lightRef.current.position.set(
                internalPointer.x,
                internalPointer.y,
                Math.sin(t)
            );
        }
    });

    return <pointLight ref={lightRef} intensity={512} />;
};
