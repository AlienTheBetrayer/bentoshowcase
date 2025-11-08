import type React from 'react';
import './Button.css';

interface Props extends React.ComponentProps<'button'> {}

export const Button = ({ className, children, ...rest }: Props) => {
    return (
        <button className={`button ${className ?? ''}`} {...rest}>
            {children}
        </button>
    );
};
