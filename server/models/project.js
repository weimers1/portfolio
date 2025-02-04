import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
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
});

export const Project = mongoose.model('Project', schema);