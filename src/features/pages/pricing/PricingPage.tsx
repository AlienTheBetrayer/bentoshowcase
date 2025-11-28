import './PricingPage.css';
import { Footer } from "../../footer/components/Footer"
import { Header } from "../../header/components/Header"
import { Page } from "../../page/components/Page"
import { CardsSection } from './sections/CardsSection';

export const PricingPage = () => {
    return (
        <Page>
            <Header/>
            <CardsSection/>
            <Footer/>
        </Page>
    )
}