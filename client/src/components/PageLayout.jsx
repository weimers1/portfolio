import Header from './Header';
import Footer from './Footer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useScreenSize from '../hooks/useScreenSize';

function PageLayout({ pages, children, loading }) {
    const screenSize = useScreenSize();
    useEffect(() => {
        if (!loading) {
            // init AOS only when loading is false
            AOS.init({
                duration: 1000,
                once: false,
                easing: 'ease-out',
                offset: screenSize.isLarge ? 175 : 55,
            });

            // refresh to detect all elements
            AOS.refresh();
        }

        // reset AOS on unmount or when loading changes
        return () => {
            AOS.refreshHard();
        };
    }, [loading]);

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
