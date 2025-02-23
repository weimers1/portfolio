import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';

function Experience(props) {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/technologies')
            .then((response) => {
                setLoading(false);
                setTechnologies(response.data);
            })
            .catch((error) => {
                setLoading(false);
                // @TODO: email errors
                console.log(error);
            });
    }, []);

    return (
        <Layout pages={props.pages}>
            {/* Jobs */}
            <section></section>

            {/* Certs - links to them (found on LinkedIn) */}
            <section></section>

            {/* Degree */}
            <section></section>

            {/* Skills */}
            <section></section>

            {/* Tech Stacks/Technologies */}
            <section>
                <div className="grid grid-cols-3 lg:grid-cols-5 place-items-center">
                    {technologies.map((technology, index) => {
                        return (
                            <div className="py-2">
                                <img
                                    key={technology._id}
                                    src={technology.svgFilePath}
                                    className={
                                        'h-15 lg:h-30 ' + technology.class
                                    }
                                    alt={technology.name}
                                    title={technology.name}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Resumes (both user friendly and ATS) */}
            <section></section>
        </Layout>
    );
}

export default Experience;
