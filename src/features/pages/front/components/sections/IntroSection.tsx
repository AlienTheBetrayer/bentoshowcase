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
            text: 'Showcasing   ',
            type: 'regular',
        },
        {
            text: 'advanced techniques',
            type: 'highlight',
        },
        {
            text: ' and a mastery of this craft — built for ',
            type: 'regular',
        },
        {
            text: 'clean structure',
            type: 'highlight',
        },
        {
            text: ' and ',
            type: 'regular',
        },
        {
            text: 'bold visual impact.',
            type: 'mark',
        },
    ];

    const p2Text: AnimatedTextContent[] = [
        {
            text: 'Leveraging declarative ',
            type: 'regular',
        },
        {
            text: 'React + TypeScript',
            type: 'mark',
        },
        {
            text: ' to push  ',
            type: 'regular',
        },
        {
            text: 'performance and precision',
            type: 'highlight',
        },
        {
            text: ' even further, delivering an interface that looks ',
            type: 'regular',
        },
        {
            text: 'sharp',
            type: 'highlight',
        },
        {
            text: ' and feels even ',
            type: 'regular',
        },
        {
            text: 'sharper.',
            type: 'mark',
        },
    ];

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
