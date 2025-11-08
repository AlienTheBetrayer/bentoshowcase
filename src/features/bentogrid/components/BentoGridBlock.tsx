import { RoundedBox } from '@react-three/drei';
import React from 'react';
import type { BentoGridBox } from '../context/types/BentoTypes';

interface Props {
    box: BentoGridBox;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
}

export const BentoGridBlock = React.memo(
    ({ box, onPointerEnter, onPointerLeave }: Props) => {
        return (
            <RoundedBox
                position={[...box.position]}
                args={[...box.size]}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    onPointerEnter?.();
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    onPointerLeave?.();
                }}
            >
                <meshPhysicalMaterial />
            </RoundedBox>
        );
    }
);
