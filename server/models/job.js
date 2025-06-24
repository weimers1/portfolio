import mongoose from 'mongoose';

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
        .populate({ path: 'techStack', options: { sort: { priority: -1 } } })
        .sort({ dateStart: -1 });

    return jobs;
}
