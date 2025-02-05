import express from 'express';
import { PORT, DB_CONNECTION_STRING } from './config.js';
import mongoose from 'mongoose';
import { Project, getGitHubRepoLanguages } from './models/project.js';

const app = express();

app.get('/', (request, response) => {
    return response.status(200).send('Hello World');
});

app.get('/projects', async (request, response) => {
    try {
        const projects = await Project.find({});
        projects.forEach(async (project) => {
            const projectLanguages = await getGitHubRepoLanguages(
                project['titleRepo']
            );
            console.log(projectLanguages);
        });
        return response.status(200).json(projects);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT);
});

mongoose
    .connect(DB_CONNECTION_STRING)
    .then((response) => {
        console.log('Connected to database.');
    })
    .catch((error) => {
        // @TODO: email errors
        console.log(error);
    });
