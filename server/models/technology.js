import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        filePathLogo: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'technologies',
    }
);

export const Technology = mongoose.model('Technology', schema);

export async function getTechnologies() {
    const technologies = await Technology.find({}).sort({ priority: -1 });

    return technologies;
}
