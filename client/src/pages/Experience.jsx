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
        <PageLayout
            pages={props.pages}
            loading={loading}
        >
            <section className="place-items-center py-10">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center pb-6 lg:pb-10 text-shadow-cyan">
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

            {/* Personal: project logo; description; tech stack; clicking on a project brings you to the projects page where it shows the tasks and desktop/mobile images */}
            <section></section>

            <section className="place-items-center">
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-6 pb-6 text-shadow-cyan">
                    Technologies
                </div>
                <div className="place-items-center grid grid-cols-4 lg:grid-cols-6 w-75 lg:w-250">
                    {technologies.map((technology, i) => {
                        return (
                            <img
                                key={'technology-' + i}
                                src={
                                    technology.imgFilePath
                                        ? technology.imgFilePath
                                        : '/src/assets/images/default.svg'
                                }
                                width="70%"
                                className="py-2 lg:py-4"
                            />
                        );
                    })}
                </div>
            </section>

            {/* Certs - links to them (found on LinkedIn): title; date received; linkedin link */}
            <section></section>

            {/* Schooling: just do Bing - school name; degree; field of study; date received */}
            <section></section>

            {/* Resumes - have both "For People" and "For Robots"; use pdf icons that download the selected version */}
            <section></section>
        </PageLayout>
    );
}

export default Experience;
