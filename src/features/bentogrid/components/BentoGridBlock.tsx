import { Billboard, Text } from '@react-three/drei';
import React from 'react';
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
                <boxGeometry args={[...box.size]} />
                <meshPhysicalMaterial
                    metalness={0.95}
                    roughness={0}
                    color='#fff'
                    transparent
                    opacity={0.75}
                />
                <Billboard>
                    <Text
                        fontSize={0.2}
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
