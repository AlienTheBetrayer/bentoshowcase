import { Billboard, Text } from '@react-three/drei';
import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    box: BentoGridBox;
    onPointerEnter?: (idx: number) => void;
    onPointerLeave?: (idx: number) => void;
    onPointerDown?: (idx: number) => void;
    onPointerUp?: (idx: number) => void;
    onClick?: (idx: number) => void;
}

export const BentoGridBlock = React.memo(
    ({
        box,
        onPointerEnter,
        onPointerLeave,
        onPointerDown,
        onPointerUp,
        onClick,
    }: Props) => {
        const isMobile = useMediaQuery(768);

        let size = [...box.size];
        if (isMobile) {
            size[0] *= 0.7;
            size[1] *= 0.7;
            size[2] *= 0.7;
        }

        return (
            <mesh
                position={[...box.position]}
                receiveShadow
                castShadow
                // events
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    onPointerEnter?.(box.idx);
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    onPointerLeave?.(box.idx);
                }}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    onPointerDown?.(box.idx);
                }}
                onPointerUp={(e) => {
                    e.stopPropagation();
                    onPointerUp?.(box.idx);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(box.idx);
                }}
            >
                <boxGeometry args={[size[0], size[1], size[2]]} />
                <meshPhysicalMaterial
                    metalness={0.95}
                    roughness={0}
                    color='#fff'
                    transparent
                    opacity={0.75}
                />
                <Billboard>
                    <Text
                        fontSize={isMobile ? 0.2 : 0.4}
                        color='#fff'
                        anchorX='center'
                        anchorY='middle'
                        position={[0, 0, 0]}
                    >
                        {box.content.title}
                    </Text>
                </Billboard>
            </mesh>
        );
    }
);
