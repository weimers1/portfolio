import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import Project from '../components/Project';
import useScrollToHash from '../hooks/useScrollToHash';

function Experience(props) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [projectsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/projects'),
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
                        />
                    );
                })}
            </section>
        </PageLayout>
    );
}

export default Experience;
