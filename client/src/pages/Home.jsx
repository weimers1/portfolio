import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import profile from '../assets/images/profile.jpg';
import { Icon } from '@iconify/react';

function Home() {
    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/')
            .then((response) => {
                setLoading(false);
                setSocials(response.data.socials);
                setProjects(response.data.projects);
            })
            .catch((error) => {
                setLoading(false);
                // @TODO: email errors
                console.log(error);
            });
    }, []);

    const stats = useMemo(() => {
        const languageArray = [];
        var commitCountTotal = 0;

        projects.forEach((project) => {
            Object.keys(project.languages).forEach((language) => {
                if (languageArray.indexOf(language) === -1)
                    languageArray.push(language);
            });

            commitCountTotal += project.commitCount;
        });

        return {
            languages: languageArray,
            commitCountTotal: commitCountTotal + 600, // including commits from private repos/other jobs
            yearsExperience: Math.floor(
                Math.abs(
                    new Date('2020-04-27').getTime() - new Date().getTime() // 2020-04-27 marks the start date of the weimers1 GitHub account
                ) /
                    (1000 * 60 * 60 * 24 * 365.25)
            ),
        };
    }, [projects]);

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
                    <section className="place-items-center lg:pb-10">
                        <img
                            className="rounded-full w-40 lg:w-80 shadow-2xl shadow-cyan-600 border-3 lg:border-6 border-cyan-600"
                            src={profile}
                        />
                    </section>
                    <section className="p-5 py-10 text-center lg:flex lg:justify-center text-3xl lg:text-5xl text-shadow-cyan">
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 pb-7 lg:pb-0 lg:pe-6 lg:mt-2">
                            Sam Weimer
                        </div>
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 py-7 lg:py-0 lg:px-6 lg:mt-2">
                            Full Stack Developer
                        </div>
                        <div className="flex justify-center pt-7 lg:pt-0 lg:ps-4">
                            {socials.map((social) => {
                                return (
                                    <a
                                        className="p-3 text-white"
                                        href={social.urlWebsite}
                                        target="_blank"
                                        key={social._id}
                                    >
                                        <Icon
                                            icon={social.icon}
                                            title={social.title}
                                            className="w-8 h-8 lg:w-11 lg:h-11"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                    <section className="lg:hidden place-items-center">
                        <div className="h-50"></div>
                        <p className="text-white text-3xl border-b w-45 text-center pb-8 text-shadow-cyan">
                            Highlights
                        </p>
                    </section>
                    <section className="py-10 grid grid-cols-1 lg:grid-cols-3 place-items-center">
                        <div className="bg-white w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 mb-10 lg:mb-0">
                            <div className="pt-6 lg:pt-8 text-cyan-600">
                                <p className="text-4xl lg:text-7xl">
                                    {stats.yearsExperience}+
                                </p>
                                <p className="text-xl lg:text-3xl">Y.O.E.</p>
                            </div>
                        </div>
                        <div className="bg-white w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0">
                            <div className="pt-6 lg:pt-8 text-cyan-600">
                                <p className="text-4xl lg:text-7xl">
                                    {stats.commitCountTotal}
                                </p>
                                <p className="text-xl lg:text-3xl">Commits</p>
                            </div>
                        </div>
                        <div className="bg-white w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0">
                            <div className="pt-5 lg:pt-7 text-cyan-600">
                                <p className="text-4xl lg:text-7xl">
                                    {stats.languages.length}+
                                </p>
                                <p className="text-sm lg:text-2xl">
                                    Programming Languages
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="pt-10 grid grid-cols-1 lg:grid-cols-2 place-items-center">
                        <p className="text-white text-3xl lg:text-5xl border-b w-45 lg:w-200 text-center pb-8 text-shadow-cyan col-span-2">
                            Projects
                        </p>
                    </section>
                </div>
            )}
        </Layout>
    );
}

export default Home;
