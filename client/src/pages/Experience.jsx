import Layout from '../components/Layout';
import reactLogo from '../assets/images/react.svg';
import viteLogo from '../assets/images/vite.svg';

function Experience() {
    return (
        <Layout>
            <img
                src={reactLogo}
                className="logo react"
                alt="React logo"
            />
            <img
                src={viteLogo}
                className="logo"
                alt="Vite logo"
            />
        </Layout>
    );
}

export default Experience;
