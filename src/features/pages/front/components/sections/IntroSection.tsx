import { useState } from 'react';
import {
    AnimatedText,
    type AnimatedTextContent,
} from '../../../../animatedtext/components/AnimatedText';
import { useLoadingContext } from '../../../../loading/context/LoadingContext';
import './IntroSection.css';

export const IntroSection = () => {
    const [loadingState] = useLoadingContext();

    const h1Text: AnimatedTextContent[] = [
        {
            text: 'Interactable 3D Grid',
            type: 'regular',
        },
    ];

    const p1Text: AnimatedTextContent[] = [
        {
            text: 'Showcasing advanced techniques and a mastery of this craft — built for clean structure and bold visual impact.',
            type: 'regular',
        },
    ];

    const p2Text: AnimatedTextContent[] = [
        {
            text: 'Leveraging declarative React + TypeScript to push performance and precision even further, delivering an interface that looks sharp and feels even sharper.',
            type: 'regular',
        },
    ];

    const a = useState<number>(3);

    return (
        loadingState.hasHeaderFinished && (
            <section className='section' style={{ marginTop: '8rem' }}>
                <div className='intro-container'>
                    <AnimatedText as='h1' text={h1Text} duration={8} />
                    <AnimatedText as='p' text={p1Text} delay={1.5} />
                    <AnimatedText as='p' text={p2Text} delay={7.5} />
                </div>
            </section>
        )
    );
};
