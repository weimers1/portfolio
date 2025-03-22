import mongoose from 'mongoose';
import { executeFetch } from '../global.js';
import { GITHUB_API_KEY } from '../config.js';

const schema = mongoose.Schema(
    {
        titleCompany: {
            type: String,
            required: true,
        },
        titlePosition: {
            type: String,
            required: true,
        },
        description: {
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
        dateStart: {
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        dateEnd: {
            type: mongoose.Schema.Types.Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Job = mongoose.model('Job', schema);

export async function getJobs() {
    const jobs = await Job.find({})
        .populate('techStack')
        .sort({ dateStart: -1 });

    return jobs;
}
