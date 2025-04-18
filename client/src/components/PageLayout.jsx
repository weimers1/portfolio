import Header from './Header';
import Footer from './Footer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useScreenSize from '../hooks/useScreenSize';
import { useLocation } from 'react-router-dom';

function PageLayout({ pages, children, loading }) {
    const location = useLocation();
    const currentRoute = location.pathname;

    const screenSize = useScreenSize();

    useEffect(() => {
        if (!loading) {
            // init AOS only when loading is false
            AOS.init({
                duration: 1000,
                once: false,
                easing: 'ease-out',
                offset: screenSize.isLarge ? 170 : 50,
            });

            // refresh to detect all elements
            AOS.refresh();
        }

        // reset AOS on unmount or when loading changes
        return () => {
            AOS.refreshHard();
        };
    }, [loading]);

    useEffect(() => {
        pages.forEach((page) => {
            if (page.path === currentRoute)
                document.title = 'Sam Weimer | ' + page.title;
        });
    }, []);

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
