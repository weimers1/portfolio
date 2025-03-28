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
        imgFilePath: {
            type: String,
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
    const technologies = await Technology.find({});

    return technologies;
}
