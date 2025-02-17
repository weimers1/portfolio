import Layout from '../components/Layout';

function Experience(props) {
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
                {/* {iterate over technologies and display them as images/icons depending on their data} */}
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
