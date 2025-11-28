import { Footer } from '../../footer/components/Footer';
import { Header } from '../../header/components/Header';
import { Loading } from '../../loading/components/Loading';
import { Page } from '../../page/components/Page';
import './PricingPage.css';
import { CardsSection } from './sections/CardsSection';

export const PricingPage = () => {
    return (
        <Page>
            <Header />
            <Loading />

            <CardsSection />
            <Footer />
        </Page>
    );
};
