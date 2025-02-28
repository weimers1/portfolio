import Header from './Header';
import Footer from './Footer';

function PageLayout({ pages, children }) {
    return (
        <>
            <Header pages={pages}></Header>
            <main className="container min-h-screen lg:py-10">{children}</main>
            <Footer pages={pages}></Footer>
        </>
    );
}

export default PageLayout;
