import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToHash(loading) {
    const location = useLocation();

    useEffect(() => {
        if (!loading && location.hash) {
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, [loading, location]);
}

export default useScrollToHash;
