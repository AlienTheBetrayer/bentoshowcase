import { RoundedBox } from '@react-three/drei';
import React from 'react';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    box: BentoGridBox;
    onPointerEnter?: (idx: number) => void;
    onPointerLeave?: (idx: number) => void;
    onClick?: (idx: number) => void;
}

export const BentoGridBlock = React.memo(
    ({ box, onPointerEnter, onPointerLeave, onClick }: Props) => {
        return (
            <RoundedBox
                position={[...box.position]}
                args={[...box.size]}
                radius={0.3}
                smoothness={10}
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
                <meshPhysicalMaterial />
            </RoundedBox>
        );
    }
);
