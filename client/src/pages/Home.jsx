import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import profile from '../assets/images/profile.jpg';
import { Icon } from '@iconify/react';

function Home() {
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/')
            .then((response) => {
                setLoading(false);
                console.log(response);
                setSocials(response.data.socials);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);
    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center h-120 lg:h-170 items-center">
                    <Icon
                        icon="mdi:loading"
                        className="animate-spin w-30 h-30 lg:w-75 lg:h-75"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1">
                    <div className="place-items-center lg:pb-10">
                        <img
                            className="rounded-full w-40 lg:w-80 shadow-2xl shadow-cyan-600 border-3 lg:border-6 border-cyan-600"
                            src={profile}
                        />
                    </div>
                    <div className="p-5 lg:pe-10 pt-10 text-center lg:flex lg:justify-center text-3xl lg:text-5xl text-shadow-cyan">
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 pb-7 lg:pb-0 lg:pe-6">
                            Sam Weimer
                        </div>
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 py-7 lg:py-0 lg:px-6">
                            Full Stack Developer
                        </div>
                        <div className="flex justify-center pt-7 lg:pt-0 lg:ps-4">
                            {socials.map((social) => {
                                return (
                                    <a
                                        className="p-3"
                                        href={social.urlWebsite}
                                        target="_blank"
                                        key={social._id}
                                    >
                                        <Icon
                                            icon={social.icon}
                                            title={social.title}
                                            className="w-7 lg:w-10"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Home;
