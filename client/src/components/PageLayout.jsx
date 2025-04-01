import Header from './Header';
import Footer from './Footer';
import { Icon } from '@iconify/react/dist/iconify.js';

function PageLayout({ pages, children, loading }) {
    return (
        <>
            <Header pages={pages}></Header>
            {loading ? (
                <div className="flex justify-center h-120 lg:h-170 items-center">
                    <Icon
                        icon="mdi:loading"
                        className="animate-spin w-30 h-30 lg:w-75 lg:h-75"
                    />
                </div>
            ) : (
                <main className="container min-h-screen lg:py-10">
                    {children}
                </main>
            )}
            <Footer pages={pages}></Footer>
        </>
    );
}

export default PageLayout;
