import { Container, InnerContent } from "./LayoutStyles";
import Footer from "./Footer";
import Header from "./Header";

export default function PageTemplate ({header,footer,HaveClass,children}) {
    return (
        <Container>
            {header?<Header/>:null}
            <InnerContent className={`${HaveClass}`}>
                {children}
            </InnerContent>
            {footer?<Footer/>:null}
        </Container>
    )
}