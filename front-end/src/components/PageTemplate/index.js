import Container from "./Container";
import InnerContent from "./InnerContent";
import Footer from "../Footer";
import Header from "../Header";

export default function PageTemplate({ header, footer, HaveClass, children }) {
  return (
    <Container>
      {header && <Header />}
      <InnerContent className={`${HaveClass}`}>{children}</InnerContent>
      {footer && <Footer />}
    </Container>
  );
}
