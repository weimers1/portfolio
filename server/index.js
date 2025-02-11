import express from 'express';
import { PORT, DB_CONNECTION_STRING } from './config.js';
import mongoose from 'mongoose';
import { Project, getGitHubRepoLanguages } from './models/project.js';
import cors from 'cors';
import { Social } from './models/social.js';

// Create server
const app = express();

// Set server to listen on specified port
app.listen(PORT, () => {
    console.log('App is listening on port ' + PORT);
});

// Configure server middleware
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', async (request, response) => {
    try {
        const projects = await Project.find({});
        projects.forEach(async (project) => {
            const projectLanguages = await getGitHubRepoLanguages(
                project['titleRepo']
            );
        });

        const socials = await Social.find({});

        return response
            .status(200)
            .json({ projects: projects, socials: socials });
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/projects', async (request, response) => {
    try {
        const projects = await Project.find({});
        projects.forEach(async (project) => {
            const projectLanguages = await getGitHubRepoLanguages(
                project['titleRepo']
            );
        });

        return response.status(200).json(projects);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/socials', async (request, response) => {
    try {
        const socials = await Social.find({});
        return response.status(200).json(socials);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
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
