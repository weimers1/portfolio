import { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Icon } from '@iconify/react/dist/iconify.js';

function App() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/pages')
            .then((response) => {
                setLoading(false);
                setPages(response.data);
            })
            .catch((error) => {
                setLoading(false);
                // @TODO: email errors
                console.log(error);
            });
    }, []);

    const loadComponent = (componentPath) => {
        return lazy(() => import(`./pages/${componentPath}`));
    };

    const componentLoading = (
        <div className="flex justify-center h-160 lg:h-220 items-center">
            <Icon
                icon="mdi:loading"
                className="animate-spin w-30 h-30 lg:w-75 lg:h-75"
            />
        </div>
    );

    return (
        <>
            {loading ? (
                <>{componentLoading}</>
            ) : (
                <Suspense fallback={componentLoading}>
                    <Routes>
                        {pages.map((page) => {
                            const Component = loadComponent(page.title);
                            return (
                                <Route
                                    key={page.path}
                                    path={page.path}
                                    element={<Component pages={pages} />}
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
            )}
        </>
    );
}

export default App;
