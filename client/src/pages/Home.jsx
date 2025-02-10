import Layout from '../components/Layout';
import profile from '../assets/images/profile.jpg';

function Home() {
    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="place-items-center pe-2">
                    <img
                        className="rounded-full w-40 lg:w-80 shadow-2xl shadow-cyan-600 border-5 lg:border-9 border-cyan-600"
                        src={profile}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Home;
