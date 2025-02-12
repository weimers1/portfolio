import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <main className="container min-h-screen lg:py-10">{children}</main>
            <Footer></Footer>
        </>
    );
}

export default Layout;
