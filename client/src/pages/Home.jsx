import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import profile from '../assets/images/profile.jpg';
import { Icon } from '@iconify/react';

function Home(props) {
    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
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
        <PageLayout pages={props.pages}>
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
                    <section className="p-5 py-10 lg:py-5 text-center lg:flex lg:justify-center text-3xl lg:text-5xl text-shadow-cyan">
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 pb-7 lg:pb-0 lg:pe-6 lg:mt-2">
                            Sam Weimer
                        </div>
                        <div className="border-b lg:border-b-0 lg:border-e mx-10 lg:mx-0 py-7 lg:py-0 lg:px-6 lg:mt-2">
                            Full Stack Developer
                        </div>
                        <div className="flex justify-center pt-6 lg:pt-0 lg:ps-4">
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
                    <section className="lg:hidden">
                        <div className="h-50"></div>
                    </section>
                    <section className="py-10 grid grid-cols-1 lg:grid-cols-3 place-items-center">
                        <p className="lg:hidden text-white text-3xl border-b w-45 text-center mb-8 pb-8 text-shadow-cyan">
                            Highlights
                        </p>
                        <a href="/experience">
                            <div className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 mb-10 lg:mb-0">
                                <div className="pt-4 lg:pt-7 text-white text-shadow-cyan">
                                    <p className="text-4xl lg:text-7xl">
                                        {stats.yearsExperience}+
                                    </p>
                                    <p className="text-sm lg:text-2xl">
                                        Years of
                                        <br /> Experience
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://www.github.com/weimers1"
                            target="_blank"
                        >
                            <div className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0">
                                <div className="pt-6 lg:pt-8 text-white text-shadow-cyan">
                                    <p className="text-4xl lg:text-7xl">
                                        {stats.commitCountTotal}
                                    </p>
                                    <p className="text-xl lg:text-3xl">
                                        Commits
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a href="/experience#languages">
                            <div className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0">
                                <div className="pt-4 lg:pt-7 text-white text-shadow-cyan">
                                    <p className="text-4xl lg:text-7xl">
                                        {stats.languages.length}+
                                    </p>
                                    <p className="text-sm lg:text-2xl">
                                        Programming Languages
                                    </p>
                                </div>
                            </div>
                        </a>
                    </section>
                    <section className="hidden lg:block">
                        <div className="h-50"></div>
                    </section>
                    <section className="pt-10 mt-10 place-items-center">
                        <p className="text-white text-3xl lg:text-5xl border-b w-45 lg:w-200 text-center mb-8 pb-8 text-shadow-cyan">
                            Projects
                        </p>
                        {projects.map((project, i) => {
                            const image = (
                                <img
                                    src={project.imageFilePath}
                                    className="border-3 lg:border-6 border-cyan-600 rounded-md w-20 lg:w-35 h-20 lg:h-35 shadow-2xl shadow-cyan-600 bg-cyan-600/50"
                                />
                            );
                            return (
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-2 pt-3 pb-10 lg:py-10 w-50 lg:w-200 place-items-center lg:relative"
                                    key={project._id}
                                >
                                    <a
                                        href={project.urlWebsite}
                                        target="_blank"
                                    >
                                        {image}
                                    </a>
                                    <div className="mt-5 text-lg lg:text-2xl text-center lg:text-start lg:absolute lg:left-100 text-shadow-cyan">
                                        {project.description}
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            )}
        </PageLayout>
    );
}

export default Home;
