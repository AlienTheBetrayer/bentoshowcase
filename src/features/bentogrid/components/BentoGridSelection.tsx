import { Box, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, type RefObject } from 'react';
import type { Mesh } from 'three';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { CSSVariable } from '../../../utils/CSSVariable';
import { type Theme } from '../../../zustand/localStore';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    boxes: BentoGridBox[];
    selectedRef: RefObject<number | false>;
    theme: Theme;
}

export const BentoGridSelection = React.memo(
    ({ boxes, selectedRef, theme }: Props) => {
        const boxRef = useRef<Mesh>(null);
        const isMobile = useMediaQuery(768);

        useFrame((state) => {
            if (boxRef.current) {
                const t = state.clock.getElapsedTime();

                if (selectedRef.current === false) {
                    boxRef.current.visible = false;
                } else {
                    boxRef.current.visible = true;

                    const box = boxes.find(
                        (box) => box.idx === selectedRef.current
                    );
                    if (box) {
                        let scaleFactor = 1.15 + Math.sin(t * 5) * 0.1;

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
            }
        });

        return (
            <Box
                ref={boxRef}
                args={[
                    isMobile ? 0.7 : 1,
                    isMobile ? 0.7 : 1,
                    isMobile ? 0.7 : 1,
                ]}
            >
                <meshBasicMaterial transparent opacity={0} />
                <Edges color={theme && CSSVariable('--foreground-last')} />
            </Box>
        );
    }
);
