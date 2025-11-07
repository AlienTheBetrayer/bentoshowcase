import { useEffect, useRef } from 'react';

export const useCursorRef = (
    initial: { x: number; y: number } = { x: 0, y: 0 }
) => {
    const cursor = useRef<{ x: number; y: number }>(initial);

    useEffect(() => {
        const handle = (e: PointerEvent) => {
            cursor.current.x = e.clientX;
            cursor.current.y = e.clientY;
        };

        window.addEventListener('pointermove', handle);
        return () => window.removeEventListener('pointermove', handle);
    }, []);

    return cursor;
};
