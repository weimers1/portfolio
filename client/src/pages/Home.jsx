import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import profile from '../assets/images/profile.jpg';
import { Icon } from '@iconify/react';
import useScreenSize from '../hooks/useScreenSize';
import Project from '../components/Project';
import { BASE_URL_API } from '../../config';

function Home(props) {
    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);
    const [projects, setProjects] = useState([]);
    const screenSize = useScreenSize();
    useEffect(() => {
        axios
            .get(BASE_URL_API + '/')
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
        <PageLayout
            pages={props.pages}
            loading={loading}
        >
            <div className="grid grid-cols-1">
                <section className="place-items-center pt-10 lg:pt-0 lg:pb-10">
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
                        Fullstack Web Dev
                    </div>
                    <div className="flex justify-center border-b mx-10 py-7 lg:hidden text-2xl">
                        <span className='border-e px-2'>React</span>
                        <span className='border-e px-2'>Node</span>
                        <span className='border-e px-2'>Cloud</span>
                        <span className='ps-2'>Devops</span>
                    </div>
                    <div className="flex justify-center pt-6 lg:pt-0 lg:ps-4">
                        {socials.map((social) => {
                            return (
                                <a
                                    className="p-3 text-white hover:text-cyan-300"
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
                <section className='hidden lg:block place-items-center pt-2 text-4xl'>
                    <div className='flex'>
                        <div className='border-e px-5'>React</div>
                        <div className='inline border-e px-5'>Node</div>
                        <div className='inline border-e px-5'>Cloud</div>
                        <div className='inline ps-5'>DevOps</div>
                    </div>
                </section>
                <section className="lg:hidden">
                    <div
                        className={screenSize.height > 800 ? 'h-100' : 'h-50'}
                    ></div>
                </section>
                <section
                    className={
                        (screenSize.height > 1000 ? 'py-60' : 'py-10') +
                        ' grid grid-cols-1 lg:grid-cols-3 place-items-center'
                    }
                >
                    <p className="lg:hidden text-white text-3xl border-b w-45 text-center mb-8 pb-8 text-shadow-cyan">
                        Highlights
                    </p>
                    <a href="/experience">
                        <div
                            className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 mb-10 lg:mb-0"
                            data-aos="fade-up"
                        >
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
                        <div
                            className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0"
                            data-aos="fade-up"
                        >
                            <div className="pt-6 lg:pt-8 text-white text-shadow-cyan">
                                <p className="text-4xl lg:text-7xl">
                                    {stats.commitCountTotal}
                                </p>
                                <p className="text-xl lg:text-3xl">Commits</p>
                            </div>
                        </div>
                    </a>
                    <a href="/experience#technologies">
                        <div
                            className="bg-cyan-600/50 w-30 h-30 lg:w-50 lg:h-50 text-center rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 my-10 lg:my-0"
                            data-aos="fade-up"
                        >
                            <div className="pt-4 lg:pt-7 text-white text-shadow-cyan">
                                <p className="text-4xl lg:text-7xl">
                                    {stats.languages.length + 1}+
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
                    <p className="text-white text-3xl lg:text-5xl border-b w-45 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan">
                        Projects
                    </p>
                    {projects.map((project) => {
                        return (
                            <Project
                                key={project._id}
                                projectObj={project}
                            />
                        );
                    })}
                </section>
            </div>
        </PageLayout>
    );
}

export default Home;
