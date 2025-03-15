import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import { HexGrid, Layout, Hexagon, Pattern, Hex } from 'react-hexgrid';
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
            <section /*className="bg-cyan-200/60 p-4 rounded-full m-10 lg:m-30"*/
            >
                <CircularHexGrid hexagonsContent={technologies.concat()} />
                {/* <div className="grid grid-cols-3 lg:grid-cols-6 place-items-center mx-15 lg:mx-50">
                    {technologies.map((technology, index) => {
                        return (
                            <div key={technology._id}>
                                <div className="max-h-22 max-w-22 lg:max-h-35 lg:max-w-35 place-items-center">
                                    <img
                                        src={technology.svgFilePath}
                                        className={
                                            'pb-1 h-14 lg:h-30 ' +
                                            technology.class
                                        }
                                        alt={technology.name}
                                        title={technology.name}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div> */}
            </section>

            {/* Resumes (both user friendly and ATS) */}
            <section></section>
        </PageLayout>
    );
}

export default Experience;
