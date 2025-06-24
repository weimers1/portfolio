import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        urlCredential: {
            type: String,
            required: true,
        },
        dateReceived: {
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        isHidden: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Certification = mongoose.model('Certification', schema);

export async function getCertifications() {
    return await Certification.find({}).sort({ dateReceived: -1 });
}
