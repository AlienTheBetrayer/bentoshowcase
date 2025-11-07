import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
import './Loading.css';

const chunkQuantity: number = 8;

export const Loading = () => {
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    useGSAP(() => {
        gsap.timeline()
            .to('.loading-element', {
                opacity: 1,
            })
            .to('.loading-chunk', {
                xPercent: -(chunkQuantity - 1) * 100,
                duration: 4,
                ease: 'power4.inOut',
            })
            .to('.loading-element', {
                width: '33vw',
                height: '33vw',
                duration: 1,
                ease: 'circ.inOut',
                borderRadius: '12vw',
            })
            .to('.loading-element', {
                borderRadius: '0vw',
                width: '100vw',
                height: '100vh',
                duration: 1,
                ease: 'circ.inOut',
            })
            .to('.loading-container', {
                opacity: 0,
                duration: 1,
                onComplete: () => setHasFinished(true),
            });
    }, []);

    return (
        !hasFinished && (
            <div className='loading-container'>
                {Array.from({ length: chunkQuantity }).map((_, idx) => (
                    <div className='loading-chunk' key={idx}>
                        <div className='loading-element'></div>
                    </div>
                ))}
            </div>
        )
    );
};
