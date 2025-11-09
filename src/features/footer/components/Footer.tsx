import { LinkButton } from '../../ui/LinkButton/components/LinkButton';
import './Footer.css';

export const Footer = () => {
    return (
        <footer>
            <LinkButton to='https://github.com/AlienTheBetrayer' type='url'>
                Github
            </LinkButton>

            <LinkButton
                to='https://github.com/AlienTheBetrayer/universe'
                type='url'
            >
                The Universe
            </LinkButton>

            <LinkButton
                to='https://www.linkedin.com/in/gleb-pichkurov-14662a385/'
                type='url'
            >
                LinkedIn
            </LinkButton>
        </footer>
    );
};
