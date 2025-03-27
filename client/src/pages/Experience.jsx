import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import Job from '../components/Job';

function Experience(props) {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState([]);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [technologiesResponse, jobsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/technologies'),
                    axios.get('http://localhost:4000/jobs'),
                ]);

                setTechnologies(technologiesResponse.data);
                setJobs(jobsResponse.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
                // @TODO: email errors
            }
        };

        fetchAllData();
    }, []);

    return (
        <PageLayout pages={props.pages}>
            <section className="place-items-center py-10">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center pb-6 text-shadow-cyan">
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

            {/* Personal */}
            <section></section>

            {/* Tech Stacks/Technologies */}
            <section className="place-items-center">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-6 pb-6 text-shadow-cyan">
                    Tech Stacks
                </div>
                <div className="place-items-center">
                    {technologies.map((technology, i) => {
                        return (
                            <img
                                key={'technology-' + i}
                                src={
                                    technology.svgFilePath
                                        ? technology.svgFilePath
                                        : '/src/assets/images/default.svg'
                                }
                                width="8%"
                            />
                        );
                    })}
                </div>
            </section>

            {/* Certs - links to them (found on LinkedIn) */}
            <section></section>

            {/* Schooling */}
            <section></section>

            {/* Resumes (both For People and For Robots) */}
            <section></section>
        </PageLayout>
    );
}

export default Experience;
