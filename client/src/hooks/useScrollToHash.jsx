import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToHash(loading) {
    const location = useLocation();

    useEffect(() => {
        if (!loading && location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, location]);
}

export default useScrollToHash;
