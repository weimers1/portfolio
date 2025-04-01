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
                imageFilePath: '/src/assets/images/weld-wise.png',
                techStack: [],
            },
        ];

        // get existing projects
        const projects = await getProjects();
        const existingProjects = {};
        for (const project of projects) {
            existingProjects[project.titleProject] = project.titleProject;
        }

        for (const project of projectData) {
            // ignore duplicates for now, maybe update them later
            if (existingProjects[project.titleProject] == project.titleProject)
                continue;

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

            // create project
            const newProject = new Project({
                titleProject: project.titleProject,
                titleRepo: project.titleRepo,
                description: project.description,
                urlWebsite: project.urlWebsite,
                imageFilePath: project.imageFilePath,
                techStack: project.techStack,
            });

            // add project to db
            await newProject.save();
            console.log(`${newProject.titleProject} added successfully.`);
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
