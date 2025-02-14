import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Page = mongoose.model('Page', schema);

export async function getPages() {
    return await Page.find({});
}
