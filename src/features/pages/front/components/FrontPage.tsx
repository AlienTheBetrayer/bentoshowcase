import { Header } from '../../../header/components/Header';
import { Loading } from '../../../loading/components/Loading';
import { LoadingProvider } from '../../../loading/context/LoadingContext';
import { IntroSection } from './sections/IntroSection';

export const FrontPage = () => {
    return (
        <LoadingProvider>
            <main className='page'>
                <Header />

                <Loading />
                <IntroSection />
            </main>
        </LoadingProvider>
    );
};
