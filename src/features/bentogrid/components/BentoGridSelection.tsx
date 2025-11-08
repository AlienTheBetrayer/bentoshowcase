import { Box, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, type RefObject } from 'react';
import type { Mesh } from 'three';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    boxes: BentoGridBox[];
    selectedRef: RefObject<number | false>;
}

export const BentoGridSelection = React.memo(
    ({ boxes, selectedRef }: Props) => {
        const boxRef = useRef<Mesh>(null);

        useFrame(() => {
            if (boxRef.current) {
                if (selectedRef.current === false) {
                    boxRef.current.visible = false;
                } else {
                    boxRef.current.visible = true;

                    const box = boxes[selectedRef.current];
                    const scaleFactor = 1.1;

                    boxRef.current.scale.set(
                        box.size[0] * scaleFactor,
                        box.size[1] * scaleFactor,
                        box.size[2] * scaleFactor
                    );
                    boxRef.current.position.set(
                        box.position[0],
                        box.position[1],
                        box.position[2]
                    );
                }
            }
        });

        return (
            <Box ref={boxRef} args={[1, 1, 1]}>
                <meshBasicMaterial transparent opacity={0} />
                <Edges color='#fff' />
            </Box>
        );
    }
);
