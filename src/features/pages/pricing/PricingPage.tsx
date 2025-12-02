import { Footer } from '../../footer/components/Footer';
import { Header } from '../../header/components/Header';
import { Loading } from '../../loading/components/Loading';
import { Page } from '../../page/components/Page';
import './PricingPage.css';
import { CardsSection } from './sections/CardsSection';
import { ReviewSection } from './sections/ReviewSection';

export const PricingPage = () => {
    return (
        <Page className='pricing-page'>
            <Header />
            <Loading />

            <CardsSection />
            <ReviewSection/>
            <Footer />
        </Page>
    );
};
