import type { MotionValue, SpringOptions } from 'motion';
import { useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

export const useCursorRef = (
    springSmoothness?: SpringOptions,
    initial: { x: number; y: number } = { x: 0, y: 0 },
) => {
    const cursor = useRef<{ x: number; y: number }>(initial);
    const smoothed = useRef<{ x: MotionValue<number>; y: MotionValue<number> }>(
        {
            x: useSpring(initial.x, springSmoothness),
            y: useSpring(initial.x, springSmoothness),
        }
    );

    useEffect(() => {
        const handle = (e: PointerEvent) => {
            cursor.current.x = e.clientX;
            cursor.current.y = e.clientY;

            if (springSmoothness) {
                smoothed.current.x.set(e.clientX);
                smoothed.current.y.set(e.clientY);
            }
        };

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, []);

    return {
        cursor,
        smoothed,
    };
};
