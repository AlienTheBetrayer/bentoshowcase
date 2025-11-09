import { useState } from 'react';
import './ToggleButton.css';

import { motion } from 'motion/react';

interface Props {
    value?: boolean;
    onChange?: (internalValue: boolean) => void;
}

export const ToggleButton = ({ value, onChange }: Props) => {
    const [internal, setInternal] = useState<boolean>(false);
    const val = value ?? internal;

    return (
        <button
            className='toggle-button'
            style={{ justifyContent: !val ? 'flex-start' : 'flex-end' }}
            onClick={() => {
                onChange?.(!val);
                if (value === undefined) {
                    setInternal((prev) => !prev);
                }
            }}
        >
            <motion.div layout className='toggle-button-thumb' />
        </button>
    );
};
