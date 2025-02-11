import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        urlWebsite: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Social = mongoose.model('Social', schema);
