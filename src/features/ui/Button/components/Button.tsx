import type React from 'react';
import './Button.css';

interface Props extends React.ComponentProps<'button'> {
    isEnabled?: boolean;
}

export const Button = ({ className, children, isEnabled, ...rest }: Props) => {
    return (
        <button
            className={`button ${className ?? ''} ${
                (isEnabled ?? true) === false ? 'button-disabled' : ''
            }`}
            {...rest}
            disabled={!(isEnabled ?? true)}
        >
            {children}
        </button>
    );
};
