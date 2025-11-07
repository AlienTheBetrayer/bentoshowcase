import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.css';

type RouteType = 'router' | 'url';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    type?: RouteType;
    onClick?: () => void;
}

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(
    (
        { className, to = '', type = 'router', onClick, children, ...rest },
        ref
    ) => {
        return type === 'router' ? (
            <Link
                ref={ref}
                className={`link-button ${className ?? ''}`}
                to={to}
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onClick?.();
                }}
                {...rest}
            >
                {children}
            </Link>
        ) : (
            <a
                ref={ref}
                className={`link-button ${className ?? ''}`}
                href={to}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => onClick?.()}
                {...rest}
            >
                {children}
            </a>
        );
    }
);
