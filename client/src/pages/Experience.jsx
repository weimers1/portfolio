import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import Job from '../components/Job';
import Project from '../components/Project';
import Certification from '../components/Certification';
import { Icon } from '@iconify/react/dist/iconify.js';
import useScrollToHash from '../hooks/useScrollToHash';
import { BASE_URL_API } from '../../config';

function Experience(props) {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [
                    technologiesResponse,
                    jobsResponse,
                    projectsResponse,
                    certificationsResponse,
                ] = await Promise.all([
                    axios.get(BASE_URL_API + '/technologies'),
                    axios.get(BASE_URL_API + '/jobs'),
                    axios.get(BASE_URL_API + '/projects'),
                    axios.get(BASE_URL_API + '/certifications'),
                ]);

                setTechnologies(technologiesResponse.data);
                setJobs(jobsResponse.data);
                setProjects(projectsResponse.data);
                setCertifications(certificationsResponse.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
                // @TODO: email errors
            }
        };

        fetchAllData();
    }, []);

    useScrollToHash(loading);

    return (
        <PageLayout
            pages={props.pages}
            loading={loading}
        >
            <section className="flex flex-col place-items-center pt-10 pb-20 lg:pb-30">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan">
                    Professional
                </div>
                <div className="grid grid-cols-1">
                    {jobs.map((job) => {
                        return (
                            <Job
                                key={job._id}
                                jobObj={job}
                            />
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col place-items-center py-20 lg:py-30">
                <p className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan">
                    Personal
                </p>
                {projects.map((project) => {
                    return (
                        <Project
                            key={project._id}
                            projectObj={project}
                            displayTechnologies={true}
                            displayViews={true}
                        />
                    );
                })}
            </section>

            <section className="flex flex-col place-items-center py-20 lg:py-30">
                <div
                    id="technologies"
                    className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan"
                >
                    Technologies
                </div>
                <div
                    className="flex flex-col place-items-center grid grid-cols-4 lg:grid-cols-6 w-75 lg:w-250"
                    data-aos="fade-up"
                >
                    {technologies.map((technology, i) => {
                        return (
                            <img
                                key={'technology-' + i}
                                src={
                                    technology.filePathLogo
                                        ? technology.filePathLogo
                                        : '/src/assets/images/default.svg'
                                }
                                width="70%"
                                className="py-2 lg:py-4"
                            />
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col place-items-center py-30 lg:py-35">
                <div className="text-3xl lg:text-5xl border-b w-60 lg:w-200 mb-10 pb-10 lg:mb-20 lg:pb-20 text-white text-shadow-cyan text-center">
                    Education
                </div>
                <div
                    className="w-47 h-47 lg:w-70 lg:h-70 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 flex flex-col place-items-center text-white text-shadow-cyan text-center mt-2"
                    data-aos="fade-up"
                >
                    <div className="border-b w-25 lg:w-40 text-xl lg:text-2xl mb-1 lg:mb-3 pb-1 lg:pb-3 pt-4 lg:pt-7">
                        Binghamton University
                    </div>
                    <div className="border-b w-35 lg:w-50 text-md lg:text-xl mb-1 lg:mb-3 pb-1 lg:pb-3">
                        Bachelor of Science
                    </div>
                    <div className="border-b w-30 lg:w-40 text-md lg:text-xl mb-1 lg:mb-3 pb-1 lg:pb-3">
                        Computer Science
                    </div>
                    <div className="text-md lg:text-xl">12/2021</div>
                </div>
            </section>

            <section className="flex flex-col place-items-center py-20 lg:py-30">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan">
                    Certifications
                </div>
                <div className="lg:flex lg:flex-wrap lg:justify-center lg:gap-20 lg:pt-4 w-75 lg:w-250">
                    {certifications.map((certification) => {
                        return (
                            <Certification
                                key={certification._id}
                                certificationObj={certification}
                            />
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col place-items-center py-30 lg:py-40">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-10 pb-10 lg:mb-20 lg:pb-20 text-shadow-cyan">
                    Resume
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-30 pt-2">
                    <a
                        href="https://docs.google.com/document/d/161mlS0I6dyOg_cMjW2L4OlbMkll4QuSpUXKYaRuloco/"
                        target="_blank"
                    >
                        <div
                            className="w-20 h-20 lg:w-40 lg:h-40 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 flex flex-col place-items-center text-white text-md lg:text-2xl text-shadow-cyan text-center pt-5 lg:pt-10"
                            data-aos="fade-up"
                        >
                            <Icon
                                className="w-10 h-10 lg:w-15 lg:h-15 mt-1"
                                icon="mdi-google-drive"
                            />
                        </div>
                    </a>
                    <a
                        href="/src/assets/documents/SamWeimerResume.pdf"
                        target="_blank"
                    >
                        <div
                            className="w-20 h-20 lg:w-40 lg:h-40 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 flex flex-col place-items-center text-white text-md lg:text-2xl text-shadow-cyan text-center my-20 lg:my-0 pt-5 lg:pt-10"
                            data-aos="fade-up"
                        >
                            <Icon
                                className="w-10 h-10 lg:w-15 lg:h-15 mt-1"
                                icon="mdi-paperclip"
                            />
                        </div>
                    </a>
                </div>
            </section>
        </PageLayout>
    );
}

export default Experience;
