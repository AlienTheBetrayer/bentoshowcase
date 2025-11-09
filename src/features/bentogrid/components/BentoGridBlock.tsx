import { Billboard, Text } from '@react-three/drei';
import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { CSSVariable } from '../../../utils/CSSVariable';
import { type Theme } from '../../../zustand/localStore';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    box: BentoGridBox;
    onPointerEnter?: (idx: number) => void;
    onPointerLeave?: (idx: number) => void;
    onClick?: (idx: number) => void;
    theme: Theme;
}

export const BentoGridBlock = React.memo(
    ({ box, onPointerEnter, onPointerLeave, onClick, theme }: Props) => {
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
                        fontSize={isMobile ? 0.2 : 0.3}
                        color={theme && CSSVariable('--foreground-last')}
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
