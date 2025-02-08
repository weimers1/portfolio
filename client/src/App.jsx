import { useState } from 'react';
import reactLogo from './assets/images/react.svg';
import viteLogo from './assets/images/vite.svg';
import './App.css';
import Header from './components/Header';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header></Header>
            <main className="container">
                <div>
                    <a
                        href="https://vite.dev"
                        target="_blank"
                    >
                        <img
                            src={viteLogo}
                            className="logo"
                            alt="Vite logo"
                        />
                    </a>
                    <a
                        href="https://react.dev"
                        target="_blank"
                    >
                        <img
                            src={reactLogo}
                            className="logo react"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="bg-red-400 text-white">
                    Click on the Vite and React logos to learn more
                </p>
            </main>
        </>
    );
}

export default App;
