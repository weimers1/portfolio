import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import Job from '../components/Job';
import Project from '../components/Project';
import Certification from '../components/Certification';
import { Icon } from '@iconify/react/dist/iconify.js';
import useScrollToHash from '../hooks/useScrollToHash';

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
                    axios.get('http://localhost:4000/technologies'),
                    axios.get('http://localhost:4000/jobs'),
                    axios.get('http://localhost:4000/projects'),
                    axios.get('http://localhost:4000/certifications'),
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
            <section className="place-items-center pt-10 lg:pt-20">
                {projects.map((project) => {
                    return (
                        <Project
                            key={project._id}
                            projectObj={project}
                            displayViews={true}
                        />
                    );
                })}
            </section>
        </PageLayout>
    );
}

export default Experience;
