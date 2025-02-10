import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <main className="container h-screen">{children}</main>
            <Footer></Footer>
        </>
    );
}

export default Layout;
