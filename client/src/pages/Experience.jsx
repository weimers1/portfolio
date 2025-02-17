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
                {technologies.map((technology) => {
                    {
                        technology.icon;
                    }
                    if (technology.icon !== '') {
                        return (
                            <Icon
                                key={technology._id}
                                className={'w-20 h-20 ' + technology.class}
                                icon={technology.icon}
                                title={technology.name}
                            />
                        );
                    }

                    if (technology.svgFilePath !== '') {
                        return (
                            <img
                                key={technology._id}
                                src={technology.svgFilePath}
                                className={'w-20 h-20 ' + technology.class}
                                alt={technology.name}
                                title={technology.name}
                            />
                        );
                    }
                })}
                {}
                {/* <img
                src={reactLogo}
                className="logo react"
                alt="React logo"
                /> */}
            </section>

            {/* Resumes (both user friendly and ATS) */}
            <section></section>
        </Layout>
    );
}

export default Experience;
