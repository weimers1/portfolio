import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../config.js';
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
                imgFilePath: '/src/assets/images/nginx.svg',
            },
            {
                name: 'GitHub',
                type: 'tool',
                imgFilePath: '/src/assets/images/github.svg',
            },
            {
                name: 'Jira',
                type: 'tool',
                imgFilePath: '/src/assets/images/jira.svg',
            },
            {
                name: 'Vite',
                type: 'tool',
                imgFilePath: '/src/assets/images/vite.svg',
            },
            {
                name: 'React',
                type: 'framework',
                imgFilePath: '/src/assets/images/react.svg',
            },
            {
                name: 'CSS',
                type: 'language',
                imgFilePath: '/src/assets/images/css.svg',
            },
            {
                name: 'HTML',
                type: 'language',
                imgFilePath: '/src/assets/images/html.svg',
            },
            {
                name: 'JavaScript',
                type: 'language',
                imgFilePath: '/src/assets/images/javascript.svg',
            },
            {
                name: 'MongoDB',
                type: 'database',
                imgFilePath: '/src/assets/images/mongodb.svg',
            },
            {
                name: 'Tailwind CSS',
                type: 'framework',
                imgFilePath: '/src/assets/images/tailwind.svg',
            },
            {
                name: 'Laravel',
                type: 'framework',
                imgFilePath: '/src/assets/images/laravel.svg',
            },
            {
                name: 'Bootstrap',
                type: 'framework',
                imgFilePath: '/src/assets/images/bootstrap.svg',
            },
            {
                name: 'MySQL',
                type: 'database',
                imgFilePath: '/src/assets/images/mysql.png',
            },
            {
                name: 'Firestore',
                type: 'database',
                imgFilePath: '/src/assets/images/firestore.svg',
            },
            {
                name: 'Adobe ColdFusion',
                type: 'language',
                imgFilePath: '/src/assets/images/coldfusion.svg',
            },
            {
                name: 'Vue.js',
                type: 'framework',
                imgFilePath: '/src/assets/images/vue.svg',
            },
            {
                name: 'jQuery',
                type: 'framework',
                imgFilePath: '/src/assets/images/jquery.svg',
            },
            {
                name: 'SQL',
                type: 'language',
                imgFilePath: '/src/assets/images/sql.svg',
            },
            {
                name: 'Python',
                type: 'language',
                imgFilePath: '/src/assets/images/python.svg',
            },
            {
                name: 'Java',
                type: 'language',
                imgFilePath: '/src/assets/images/java.png',
            },
            {
                name: 'PHP',
                type: 'language',
                imgFilePath: '/src/assets/images/php.svg',
            },
            {
                name: 'Express.js',
                type: 'framework',
                imgFilePath: '/src/assets/images/express.svg',
            },
            {
                name: 'Node.js',
                type: 'tool',
                imgFilePath: '/src/assets/images/node.svg',
            },
            {
                name: 'Visual Studio Code',
                type: 'tool',
                imgFilePath: '/src/assets/images/vscode.svg',
            },
            {
                name: 'Docker',
                type: 'tool',
                imgFilePath: '/src/assets/images/docker.svg',
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
                imgFilePath: technology.imgFilePath,
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
