import express from 'express';
import bodyParser from 'body-parser';
import { getProjects } from './models/project.js';
import { getSocials } from './models/social.js';
import { getPages } from './models/page.js';
import { getTechnologies } from './models/technology.js';
import { getJobs } from './models/job.js';
import mongoose from 'mongoose';
import cors from 'cors';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { getCertifications } from './models/certification.js';
import { isValidEmail } from './global.js';
import 'dotenv/config.js';

const PORT_SERVER = process.env.PORT || 8080;
const URL_CLIENT = process.env.URL_CLIENT || 'http://localhost';
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const BREVO_API_KEY = process.end.BREVO_API_KEY;

// Create server
const app = express();

// Set server to listen on specified port
app.listen(PORT_SERVER, () => {
    console.log('App is listening on port ' + PORT_SERVER);
});

// debug
// console.log('\nprocess.env.BREVO_API_KEY set to:', process.env.BREVO_API_KEY);
// console.log('\nBREVO_API_KEY set to:', BREVO_API_KEY);
// console.log('\nGITHUB_API_KEY set to:', GITHUB_API_KEY);
// console.log('\nCORS origin set to:', URL_CLIENT);

// Configure server middleware
const corsOptions = {
    origin: URL_CLIENT,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (request, response) => {
    try {
        const projects = await getProjects();

        const socials = await getSocials();

        return response
            .status(200)
            .json({ projects: projects, socials: socials });
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/pages', async (request, response) => {
    try {
        const pages = await getPages();

        return response.status(200).json(pages);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /pages');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/projects', async (request, response) => {
    try {
        const projects = await getProjects();

        return response.status(200).json(projects);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /projects');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/socials', async (request, response) => {
    try {
        const socials = await getSocials();
        return response.status(200).json(socials);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /socials');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/technologies', async (request, response) => {
    try {
        const technologies = await getTechnologies();
        return response.status(200).json(technologies);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /technologies');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/jobs', async (request, response) => {
    try {
        const jobs = await getJobs();
        return response.status(200).json(jobs);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /jobs');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.get('/certifications', async (request, response) => {
    try {
        const certifications = await getCertifications();
        return response.status(200).json(certifications);
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: GET /certifications');
        console.log(error);
        response.status(500).send('System Error');
    }
});

app.post('/contact', async (request, response) => {
    try {
        // grab param data
        const token = request.body['cf-turnstile-response'];
        const ip = request.headers['cf-connecting-ip'];
        const email = request.body.email;
        const message = request.body.message;

        // validate email/message
        if (!email || !isValidEmail(email)) {
            return response
                .status(400)
                .json({ error: 'Please enter a valid email address.' });
        }
        if (!message || message.trim() === '') {
            return response
                .status(400)
                .json({ error: 'Please enter a message.' });
        }

        // verify turnstile
        const turnstileResult = await verifyTurnstile(token, ip);
        if (turnstileResult !== 'success') {
            return response.status(400).json({
                error: 'Turnstile verification failed. Please try refreshing the page.',
            });
        }

        // send self the email
        sendEmail(email, message, 'New Message');

        return response
            .status(200)
            .json({ success: 'Message sent successfully!' });
    } catch (error) {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: POST /contact');
        console.log(error);
        response.status(500).send('System Error');
    }
});

const sendEmail = async (emailFrom, message, subject) => {
    // setup brevo api 
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // populate email details
    sendSmtpEmail.sender = { email: 'sam@samweimer.com', name: 'samweimer.com' };
    sendSmtpEmail.to = [{ email: 'samweimer7@gmail.com', name: 'Sam Weimer' }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.textContent = 'New message from ' + emailFrom + ':\n\n' + message;

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

mongoose
    .connect(DB_CONNECTION_STRING)
    .then((response) => {
        console.log('Connected to database.');
    })
    .catch((error) => {
        sendEmail('sam@samweimer.com', error, 'Portfolio Error: Database Connection Failed');
        console.log(error);
    });

// async function sendEmail() {}

async function verifyTurnstile(token, ip) {
    // validate the turnstile token by calling the siteverify endpoint
    let formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    formData.append('remoteip', ip);
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        body: formData,
        method: 'POST',
    });

    const outcome = await result.json();
    if (outcome.success) {
        console.log('Turnstile verification successful.');
        return 'success';
    }

    console.log('Turnstile verification failed:', outcome);
    return 'error';
}
