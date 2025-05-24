import mongoose from 'mongoose';
import 'dotenv/config.js';
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
import { Technology, getTechnologies } from '../models/technology.js';

async function addTechnologies() {
    try {
        // connect to database
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // technologies to be added
        const technologyData = [
            {
                name: 'Nginx',
                type: 'tool',
                filePathLogo: '/src/assets/images/nginx.svg',
            },
            {
                name: 'GitHub',
                type: 'tool',
                filePathLogo: '/src/assets/images/github.svg',
            },
            {
                name: 'Jira',
                type: 'tool',
                filePathLogo: '/src/assets/images/jira.svg',
            },
            {
                name: 'Vite',
                type: 'tool',
                filePathLogo: '/src/assets/images/vite.svg',
            },
            {
                name: 'React',
                type: 'framework',
                filePathLogo: '/src/assets/images/react.svg',
            },
            {
                name: 'CSS',
                type: 'language',
                filePathLogo: '/src/assets/images/css.svg',
            },
            {
                name: 'HTML',
                type: 'language',
                filePathLogo: '/src/assets/images/html.svg',
            },
            {
                name: 'JavaScript',
                type: 'language',
                filePathLogo: '/src/assets/images/javascript.svg',
            },
            {
                name: 'MongoDB',
                type: 'database',
                filePathLogo: '/src/assets/images/mongodb.svg',
            },
            {
                name: 'Tailwind CSS',
                type: 'framework',
                filePathLogo: '/src/assets/images/tailwind.svg',
            },
            {
                name: 'Laravel',
                type: 'framework',
                filePathLogo: '/src/assets/images/laravel.svg',
            },
            {
                name: 'Bootstrap',
                type: 'framework',
                filePathLogo: '/src/assets/images/bootstrap.svg',
            },
            {
                name: 'MySQL',
                type: 'database',
                filePathLogo: '/src/assets/images/mysql.png',
            },
            {
                name: 'Firestore',
                type: 'database',
                filePathLogo: '/src/assets/images/firestore.svg',
            },
            {
                name: 'Adobe ColdFusion',
                type: 'language',
                filePathLogo: '/src/assets/images/coldfusion.svg',
            },
            {
                name: 'Vue.js',
                type: 'framework',
                filePathLogo: '/src/assets/images/vue.svg',
            },
            {
                name: 'jQuery',
                type: 'framework',
                filePathLogo: '/src/assets/images/jquery.svg',
            },
            {
                name: 'SQL',
                type: 'language',
                filePathLogo: '/src/assets/images/sql.svg',
            },
            {
                name: 'Python',
                type: 'language',
                filePathLogo: '/src/assets/images/python.svg',
            },
            {
                name: 'Java',
                type: 'language',
                filePathLogo: '/src/assets/images/java.png',
            },
            {
                name: 'PHP',
                type: 'language',
                filePathLogo: '/src/assets/images/php.svg',
            },
            {
                name: 'Express.js',
                type: 'framework',
                filePathLogo: '/src/assets/images/express.svg',
            },
            {
                name: 'Node.js',
                type: 'tool',
                filePathLogo: '/src/assets/images/node.svg',
            },
            {
                name: 'Visual Studio Code',
                type: 'tool',
                filePathLogo: '/src/assets/images/vscode.svg',
            },
            {
                name: 'Docker',
                type: 'tool',
                filePathLogo: '/src/assets/images/docker.svg',
            },
            {
                name: 'TypeScript',
                type: 'language',
                filePathLogo: '/src/assets/images/typescript.svg',
            },
            {
                name: 'Confluence',
                type: 'tool',
                filePathLogo: '/src/assets/images/confluence.svg',
            },
            {
                name: 'Linux',
                type: 'os',
                filePathLogo: '/src/assets/images/linux.svg',
            },
            {
                name: 'Google Cloud Platform',
                type: 'tool',
                filePathLogo: '/src/assets/images/gcp.svg',
            },
        ];

        // get existing technologies
        const technologies = await getTechnologies();
        const existingTechnologies = [];
        for (const technology of technologies) {
            existingTechnologies.push(technology.name);
        }

        for (const technology of technologyData) {
            // TODO: update duplicates; skipping them for now though
            if (existingTechnologies.indexOf(technology.name) >= 0) continue;

            // create technology
            const newTechnology = new Technology({
                name: technology.name,
                type: technology.type,
                filePathLogo: technology.filePathLogo,
            });

            // add technology to db
            await newTechnology.save();
            console.log(`${newTechnology.name} added successfully.`);
        }

        console.log('All technologies added.');
    } catch (error) {
        console.error('Error adding technologies:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addTechnologies();
