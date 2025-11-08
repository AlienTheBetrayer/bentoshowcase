import { RoundedBox } from '@react-three/drei';
import React from 'react';
import type { BentoGridBoxType } from './BentoGridCanvas';

interface Props {
    box: BentoGridBoxType;
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
