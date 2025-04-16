import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../config.js';
import { Technology } from '../models/technology.js';
import { Project, getProjects } from '../models/project.js';

async function addProjects() {
    try {
        // connect to database
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // projects to be added
        const projectData = [
            {
                titleProject: 'Weld WISE',
                titleRepo: 'weld-wise-laravel',
                description:
                    'A welding certification exam preparation website owned by Weld WISE, LLC.',
                urlWebsite: 'https://www.weld-wise.net',
                filePathLogo: '/src/assets/images/weld-wise.png',
                filePathViews: '/src/assets/images/default.svg',
                tasks: [
                    'Integrate PayPal API to process user payments for access to online welding certification testing materials, ensuring secure and reliable transaction handling',
                    'Manage user authentication and authorization via Stytch magic links, providing a seamless and secure sign-up and login experience for hundreds of users',
                    'Scale application infrastructure on Google Cloud Platform to accommodate current and potential growth in user base, ensuring optimal performance and reliability',
                    'Administer Cloud SQL for MySQL database and application logic for the delivery and evaluation of welding certification tests, and manages user progress and results',
                ],
                techStack: [
                    'HTML',
                    'CSS',
                    'Bootstrap',
                    'JavaScript',
                    'PHP',
                    'Laravel',
                    'Python',
                    'MySQL',
                    'Docker',
                    'Visual Studio Code',
                    'GitHub',
                ],
            },
            {
                titleProject: 'Portfolio',
                titleRepo: 'portfolio',
                description: 'The current portfolio website you are viewing.',
                urlWebsite: 'https://www.samweimer.com',
                filePathLogo: '/src/assets/images/logo.png',
                filePathViews: '/src/assets/images/portfolio_views.png',
                tasks: [''],
                techStack: [
                    'HTML',
                    'CSS',
                    'Tailwind CSS',
                    'JavaScript',
                    'React',
                    'Express.js',
                    'Node.js',
                    'MongoDB',
                    'Docker',
                    'Visual Studio Code',
                    'GitHub',
                ],
            },
            {
                titleProject: 'Google Cloud Games',
                titleRepo: 'googlecloudgames',
                description:
                    'A small open-source games web app hosted via Google Cloud Platform.',
                urlWebsite: 'https://www.googlecloudgames.com',
                filePathLogo: '/src/assets/images/gcg.png',
                filePathViews: '/src/assets/images/default.svg',
                tasks: [''],
                techStack: [
                    'HTML',
                    'CSS',
                    'Tailwind CSS',
                    'JavaScript',
                    'React',
                    'Express.js',
                    'Node.js',
                    'Firestore',
                    'GitHub',
                ],
            },
        ];

        for (const project of projectData) {
            // find existing project
            const existingProject = await Project.findOne({
                titleProject: project.titleProject,
            });

            // get technologies based on names
            const technologyIds = [];
            for (const techName of project.techStack) {
                const technology = await Technology.findOne({ name: techName });
                if (technology) {
                    technologyIds.push(technology._id);
                } else {
                    console.warn(`Technology "${techName}" not found.`);
                }
            }

            // update duplicates
            if (existingProject) {
                const updates = {};
                if (project.titleRepo !== existingProject.titleRepo)
                    updates.titleRepo = project.titleRepo;
                if (project.description !== existingProject.description)
                    updates.description = project.description;
                if (project.urlWebsite !== existingProject.urlWebsite)
                    updates.urlWebsite = project.urlWebsite;
                if (project.filePathLogo !== existingProject.filePathLogo)
                    updates.filePathLogo = project.filePathLogo;
                if (project.filePathViews !== existingProject.filePathViews)
                    updates.filePathViews = project.filePathViews;
                if (
                    JSON.stringify(project.tasks) !==
                    JSON.stringify(existingProject.tasks)
                )
                    updates.tasks = project.tasks;
                if (
                    JSON.stringify(technologyIds) !==
                    JSON.stringify(existingProject.techStack)
                )
                    updates.techStack = technologyIds;

                if (Object.keys(updates).length > 0) {
                    await Project.findByIdAndUpdate(
                        existingProject._id,
                        updates
                    );
                    console.log(
                        `${project.titleProject} updated successfully.`
                    );
                } else {
                    console.log(`${project.titleProject} already up to date.`);
                }
            } else {
                // create project
                const newProject = new Project({
                    titleProject: project.titleProject,
                    titleRepo: project.titleRepo,
                    description: project.description,
                    urlWebsite: project.urlWebsite,
                    filePathLogo: project.filePathLogo,
                    filePathViews: project.filePathViews,
                    tasks: project.tasks,
                    techStack: technologyIds,
                });

                // add project to db
                await newProject.save();
                console.log(`${newProject.titleProject} added successfully.`);
            }
        }

        console.log('All projects added.');
    } catch (error) {
        console.error('Error adding projects:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addProjects();
