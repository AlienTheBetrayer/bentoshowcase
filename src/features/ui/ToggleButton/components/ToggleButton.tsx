import { useState, type CSSProperties } from 'react';
import './ToggleButton.css';

import { motion } from 'motion/react';

interface Props {
    value?: boolean;
    onChange?: (internalValue: boolean) => void;
    style?: CSSProperties;
}

export const ToggleButton = ({ value, onChange, style, ...rest }: Props) => {
    const [internal, setInternal] = useState<boolean>(false);
    const val = value ?? internal;

    return (
        <button
            className='toggle-button'
            style={{
                justifyContent: !val ? 'flex-start' : 'flex-end',
                ...style,
            }}
            onClick={() => {
                onChange?.(!val);
                if (value === undefined) {
                    setInternal((prev) => !prev);
                }
            }}
            {...rest}
        >
            <motion.div layout className='toggle-button-thumb' />
        </button>
    );
};
