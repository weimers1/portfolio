import express from 'express';
import { PORT, CONNECTIONSTRING } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    return response.status(200).send('Hello World');
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