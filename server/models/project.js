import mongoose from 'mongoose';
import { executeFetch } from '../global.js';
const GITHUB_API_KEY = process.env.GITHUB_API_KEY;

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
        filePathLogo: {
            type: String,
            required: true,
        },
        filePathViews: {
            type: String,
            required: true,
        },
        tasks: {
            type: Array,
            required: true,
        },
        techStack: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Technology',
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model('Project', schema);

export async function getGitHubRepoCommitCount(titleRepo) {
    const url = `https://api.github.com/repos/weimers1/${titleRepo}/contributors`;
    const headers = {
        Authorization: `token ${GITHUB_API_KEY}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await executeFetch(url, headers);
    return response[0].contributions;
}

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
    const projects = await Project.find({})
        .populate('techStack')
        .sort({ createdAt: -1 })
        .lean();

    for (let i = 0; i < projects.length; i++) {
        projects[i].languages = await getGitHubRepoLanguages(
            projects[i].titleRepo
        );
        projects[i].info = await getGitHubRepoInfo(projects[i].titleRepo);
        projects[i].commitCount = await getGitHubRepoCommitCount(
            projects[i].titleRepo
        );
    }

    return projects;
}
