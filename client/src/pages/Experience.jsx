import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import CircularHexGrid from '../components/CircularHexGrid';
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
                <div className="text-white text-3xl lg:text-5xl border-b w-60 lg:w-200 text-center mb-6 pb-6 text-shadow-cyan">
                    Professional
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
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
                <CircularHexGrid
                    hexagonsContent={technologies}
                    backgroundId="circle-background"
                />
                <svg className="hidden">
                    <symbol
                        id="circle-background"
                        viewBox="-45 -45 100 100"
                    >
                        <circle
                            cx="0"
                            cy="3"
                            r="42"
                            stroke="rgba(0, 146, 184, 1)"
                            strokeWidth="2"
                            fill="rgba(0, 146, 184, 0.5)"
                        />
                    </symbol>
                </svg>
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
