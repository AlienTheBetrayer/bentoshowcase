import { Header } from "../../../header/components/Header"
import { IntroSection } from "./sections/IntroSection"

export const FrontPage = () => {
    return (
        <main className='page'>
            <Header/>
            
            <IntroSection/>
        </main>
    )
}