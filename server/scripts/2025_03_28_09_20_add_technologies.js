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
                priority: 4,
            },
            {
                name: 'GitHub',
                type: 'tool',
                filePathLogo: '/src/assets/images/github.svg',
                priority: 8,
            },
            {
                name: 'Jira',
                type: 'tool',
                filePathLogo: '/src/assets/images/jira.svg',
                priority: 7,
            },
            {
                name: 'Vite',
                type: 'tool',
                filePathLogo: '/src/assets/images/vite.svg',
                priority: 4,
            },
            {
                name: 'React',
                type: 'framework',
                filePathLogo: '/src/assets/images/react.svg',
                priority: 12,
            },
            {
                name: 'CSS',
                type: 'language',
                filePathLogo: '/src/assets/images/css.svg',
                priority: 10,
            },
            {
                name: 'HTML',
                type: 'language',
                filePathLogo: '/src/assets/images/html.svg',
                priority: 10,
            },
            {
                name: 'JavaScript',
                type: 'language',
                filePathLogo: '/src/assets/images/javascript.svg',
                priority: 10,
            },
            {
                name: 'MongoDB',
                type: 'database',
                filePathLogo: '/src/assets/images/mongodb.svg',
                priority: 10,
            },
            {
                name: 'Tailwind CSS',
                type: 'framework',
                filePathLogo: '/src/assets/images/tailwind.svg',
                priority: 4,
            },
            {
                name: 'Laravel',
                type: 'framework',
                filePathLogo: '/src/assets/images/laravel.svg',
                priority: 5,
            },
            {
                name: 'Bootstrap',
                type: 'framework',
                filePathLogo: '/src/assets/images/bootstrap.svg',
                priority: 4,
            },
            {
                name: 'MySQL',
                type: 'database',
                filePathLogo: '/src/assets/images/mysql.png',
                priority: 9,
            },
            {
                name: 'Firestore',
                type: 'database',
                filePathLogo: '/src/assets/images/firestore.svg',
                priority: 4,
            },
            {
                name: 'Adobe ColdFusion',
                type: 'language',
                filePathLogo: '/src/assets/images/coldfusion.svg',
                priority: 2,
            },
            {
                name: 'Vue.js',
                type: 'framework',
                filePathLogo: '/src/assets/images/vue.svg',
                priority: 4,
            },
            {
                name: 'jQuery',
                type: 'framework',
                filePathLogo: '/src/assets/images/jquery.svg',
                priority: 4,
            },
            {
                name: 'SQL',
                type: 'language',
                filePathLogo: '/src/assets/images/sql.svg',
                priority: 8,
            },
            {
                name: 'Python',
                type: 'language',
                filePathLogo: '/src/assets/images/python.svg',
                priority: 7,
            },
            {
                name: 'Java',
                type: 'language',
                filePathLogo: '/src/assets/images/java.png',
                priority: 7,
            },
            {
                name: 'PHP',
                type: 'language',
                filePathLogo: '/src/assets/images/php.svg',
                priority: 5,
            },
            {
                name: 'Express.js',
                type: 'framework',
                filePathLogo: '/src/assets/images/express.svg',
                priority: 10,
            },
            {
                name: 'Node.js',
                type: 'tool',
                filePathLogo: '/src/assets/images/node.svg',
                priority: 11,
            },
            {
                name: 'Visual Studio Code',
                type: 'tool',
                filePathLogo: '/src/assets/images/vscode.svg',
                priority: 2,
            },
            {
                name: 'Docker',
                type: 'tool',
                filePathLogo: '/src/assets/images/docker.svg',
                priority: 9,
            },
            {
                name: 'TypeScript',
                type: 'language',
                filePathLogo: '/src/assets/images/typescript.svg',
                priority: 9,
            },
            {
                name: 'Confluence',
                type: 'tool',
                filePathLogo: '/src/assets/images/confluence.svg',
                priority: 5,
            },
            {
                name: 'Linux',
                type: 'os',
                filePathLogo: '/src/assets/images/linux.svg',
                priority: 5,
            },
            {
                name: 'Google Cloud Platform',
                type: 'tool',
                filePathLogo: '/src/assets/images/gcp.svg',
                priority: 7,
            },
        ];

        for (const technology of technologyData) {
            // find existing technology
            const existingTechnology = await Technology.findOne({
                name: technology.name,
            });

            // update duplicates
            if (existingTechnology) {
                const updates = {};
                if (technology.type !== existingTechnology.type)
                    updates.type = technology.type;
                if (technology.filePathLogo !== existingTechnology.filePathLogo)
                    updates.filePathLogo = technology.filePathLogo;
                if (technology.priority !== existingTechnology.priority)
                    updates.priority = technology.priority;

                if (Object.keys(updates).length > 0) {
                    await Technology.findByIdAndUpdate(
                        existingTechnology._id,
                        updates
                    );
                    console.log(`${technology.name} updated successfully.`);
                } else {
                    console.log(`${technology.name} already up to date.`);
                }
            } else {
                // create technology
                const newTechnology = new Technology({
                    name: technology.name,
                    type: technology.type,
                    filePathLogo: technology.filePathLogo,
                    priority: technology.priority,
                });

                // add technology to db
                await newTechnology.save();
                console.log(`${newTechnology.name} added successfully.`);
            }
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
