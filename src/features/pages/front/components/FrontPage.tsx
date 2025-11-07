import { Header } from "../../../header/components/Header"
import { Loading } from "../../../loading/components/Loading"
import { IntroSection } from "./sections/IntroSection"

export const FrontPage = () => {
    return (
        <main className='page'>
            <Header/>
            
            <Loading/>
            <IntroSection/>
        </main>
    )
}