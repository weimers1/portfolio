import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import Project from '../components/Project';
import useScrollToHash from '../hooks/useScrollToHash';
import { BASE_URL_API } from '../../config';

function Projects(props) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [projectsResponse] = await Promise.all([
                    axios.get(BASE_URL_API + '/projects'),
                ]);

                setProjects(projectsResponse.data);
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
                            displayTasks={true}
                            displayLanguages={true}
                        />
                    );
                })}
            </section>
        </PageLayout>
    );
}

export default Projects;
