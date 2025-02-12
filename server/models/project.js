import mongoose from 'mongoose';
import { executeFetch } from '../global.js';
import { GITHUB_API_KEY } from '../config.js';

const schema = mongoose.Schema(
    {
        titleProject: {
            type: String,
            required: true,
        },
        titleRepo: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        urlWebsite: {
            type: String,
            required: true,
        },
        imageFilePath: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model('Project', schema);

export async function getGitHubRepoInfo(titleRepo) {
    const url = `https://api.github.com/repos/weimers1/${titleRepo}`;
    const headers = {
        Authorization: `token ${GITHUB_API_KEY}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await executeFetch(url, headers);
    return response;
}

export async function getGitHubRepoLanguages(titleRepo) {
    const url = `https://api.github.com/repos/weimers1/${titleRepo}/languages`;
    const headers = {
        Authorization: `token ${GITHUB_API_KEY}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await executeFetch(url, headers);
    return response;
}

export async function getProjects() {
    const projects = await Project.find({}).lean();

    for (let i = 0; i < projects.length; i++) {
        projects[i].languages = await getGitHubRepoLanguages(
            projects[i].titleRepo
        );
        projects[i].info = await getGitHubRepoInfo(projects[i].titleRepo);
    }

    return projects;
}
