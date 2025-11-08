import { motion } from 'motion/react';

type AnimatedTextType = 'regular' | 'mark' | 'error' | 'highlight';

export interface AnimatedTextContent {
    text: string;
    type: AnimatedTextType;
}

export type TypewriterTags = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';

const wrapText = (text: string, type: AnimatedTextType) => {
    switch (type) {
        case 'regular':
            return text;
        case 'error':
            return <u>{text}</u>;
        case 'highlight':
            return <b>{text}</b>;
        case 'mark':
            return <mark>{text}</mark>;
    }
};

interface Props {
    as: TypewriterTags;
    text: AnimatedTextContent[];
    delay?: number;
    duration?: number;
}

export const AnimatedText = ({ delay, as, text, duration, ...rest }: Props) => {
    const MotionTag = motion[as];
    let idx = 0;

    return (
        <div>
            {text.map((segment, i) => (
                <span
                    className='animated-word'
                    style={{ display: 'inline', overflowWrap: 'anywhere' }}
                    key={`word-${i}`}
                >
                    {Array.from(segment.text).map((letter) => (
                        <MotionTag
                            style={{ display: 'inline' }}
                            className='animated-letter'
                            key={`animated-letter-${idx}`}
                            initial={{ opacity: 0, filter: 'blur(40px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{
                                delay: (delay ?? 0) + idx++ / 20,
                                duration: duration ?? 0.6,
                                type: 'spring',
                                damping: 8,
                                stiffness: 40,
                            }}
                            {...rest}
                        >
                            {wrapText(letter, segment.type)}
                        </MotionTag>
                    ))}
                </span>
            ))}

            <br />
        </div>
    );
};
