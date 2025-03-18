import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import CircularHexGrid from '../components/CircularHexGrid';

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
        <PageLayout pages={props.pages}>
            {/* Jobs */}
            <section></section>

            {/* Certs - links to them (found on LinkedIn) */}
            <section></section>

            {/* Degree */}
            <section></section>

            {/* Skills */}
            <section></section>

            {/* Tech Stacks/Technologies */}
            <section className="place-items-center">
                <div className="text-white text-3xl lg:text-5xl border-b w-45 lg:w-200 text-center mb-8 pb-8 text-shadow-cyan">
                    Tech Stacks
                </div>
                <CircularHexGrid hexagonsContent={technologies} />
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

            {/* Resumes (both user friendly and ATS) */}
            <section></section>
        </PageLayout>
    );
}

export default Experience;
