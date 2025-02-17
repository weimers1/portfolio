import express from 'express';
import { PORT, DB_CONNECTION_STRING } from './config.js';
import { getProjects } from './models/project.js';
import { getSocials } from './models/social.js';
import { getPages } from './models/page.js';
import { getTechnologies } from './models/technology.js';
import mongoose from 'mongoose';
import cors from 'cors';

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
        const projects = await getProjects();

        const socials = await getSocials();

        return response
            .status(200)
            .json({ projects: projects, socials: socials });
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/pages', async (request, response) => {
    try {
        const pages = await getPages();

        return response.status(200).json(pages);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/projects', async (request, response) => {
    try {
        const projects = await getProjects();

        return response.status(200).json(projects);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/socials', async (request, response) => {
    try {
        const socials = await getSocials();
        return response.status(200).json(socials);
    } catch (error) {
        // @TODO: email errors
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/technologies', async (request, response) => {
    try {
        const technologies = await getTechnologies();
        return response.status(200).json(technologies);
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
