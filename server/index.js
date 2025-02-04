import express from 'express';
import { PORT, CONNECTIONSTRING } from './config.js';
import mongoose from 'mongoose';
import { Project } from './models/project.js';

const app = express();

app.get('/', (request, response) => {
    return response.status(200).send('Hello World');
});

app.get('/projects', async (request, response) => {
    try {
        const projects = await Project.find({});
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

mongoose.connect(CONNECTIONSTRING).then((response) => {
    console.log('Connected to database.');
}).catch((error) => {
    // @TODO: email errors
    console.log(error);
});