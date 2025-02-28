import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import { HexGrid, Layout, Hexagon, Pattern, Hex } from 'react-hexgrid';
import useScreenSize from '../hooks/useScreenSize';

function Experience(props) {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState([]);
    const screenSize = useScreenSize();
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
            <section className="bg-white">
                <HexGrid
                    width={screenSize.width}
                    height={screenSize.height / 1.5}
                    viewBox="-50 -40 100 100"
                >
                    {/* Grid with manually inserted hexagons */}
                    <Layout
                        size={{ x: 10, y: 10 }}
                        flat={true}
                        spacing={1.1}
                        origin={{ x: 0, y: 0 }}
                    >
                        <Hexagon
                            q={0}
                            r={0}
                            s={0}
                        />
                        {/* Using pattern (defined below) to fill the hexagon */}
                        <Hexagon
                            q={0}
                            r={-1}
                            s={1}
                        />
                        <Hexagon
                            q={0}
                            r={1}
                            s={-1}
                        />
                        <Hexagon
                            q={1}
                            r={-1}
                            s={0}
                        ></Hexagon>
                        <Hexagon
                            q={1}
                            r={0}
                            s={-1}
                        ></Hexagon>
                        {/* Pattern and text */}
                        <Hexagon
                            q={-1}
                            r={1}
                            s={0}
                        >
                            <image
                                href="/src/assets/images/react.svg"
                                width="15%"
                                height="15%"
                                transform="translate(-7.5,-7.5)"
                            />
                        </Hexagon>
                        <Hexagon
                            q={-1}
                            r={0}
                            s={1}
                        />
                        <Hexagon
                            q={-2}
                            r={1}
                            s={-1}
                        />
                    </Layout>
                    {/* <Pattern
                        id="pat-2"
                        link="http://cat-picture2"
                    /> */}
                </HexGrid>
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
