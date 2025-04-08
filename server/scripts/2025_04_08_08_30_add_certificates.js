import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../config.js';
import { Certification } from '../models/certification.js';

async function addCertifications() {
    try {
        // connect to database
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // certifications to be added
        const certificationData = [
            {
                title: 'Google Data Analytics Professional Certificate',
                urlCredential:
                    'https://www.credly.com/badges/b1e0e9bd-b5cf-4885-a88a-43d92e4756a9/linked_in_profile',
                dateReceived: new Date('2024-08-02T00:00:00.000Z'),
            },
            {
                title: 'Google Certificate: Securing and Integrating Components of your Application',
                urlCredential:
                    'https://www.cloudskillsboost.google/public_profiles/caf59f6b-c266-41dc-8f6d-30e6e8f68aea/badges/8243073?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
                dateReceived: new Date('2024-03-02T00:00:00.000Z'),
            },
            {
                title: 'Google Certificate: Getting Started with Application Development',
                urlCredential:
                    'https://www.cloudskillsboost.google/public_profiles/caf59f6b-c266-41dc-8f6d-30e6e8f68aea/badges/8066787?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
                dateReceived: new Date('2024-02-02T00:00:00.000Z'),
            },
            {
                title: 'Google Certificate: Google Cloud Fundamentals: Core Infrastructure',
                urlCredential:
                    'https://www.cloudskillsboost.google/public_profiles/caf59f6b-c266-41dc-8f6d-30e6e8f68aea/badges/8049391?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
                dateReceived: new Date('2024-02-02T00:00:00.000Z'),
            },
        ];

        for (const certification of certificationData) {
            // find existing certification
            const existingCertification = await Certification.findOne({
                title: certification.title,
            });

            // update duplicates
            if (existingCertification) {
                const updates = {};
                if (certification.title !== existingCertification.title)
                    updates.title = certification.title;
                if (
                    certification.urlCredential !==
                    existingCertification.urlCredential
                )
                    updates.urlCredential = certification.urlCredential;
                if (
                    certification.dateReceived.getTime() !==
                    existingCertification.dateReceived.getTime()
                )
                    updates.dateReceived = certification.dateReceived;

                if (Object.keys(updates).length > 0) {
                    await Certification.findByIdAndUpdate(
                        existingCertification._id,
                        updates
                    );
                    console.log(`${certification.title} updated successfully.`);
                } else {
                    console.log(`${certification.title} already up to date.`);
                }
            } else {
                // create certification
                const newCertification = new Certification({
                    title: certification.title,
                    urlCredential: certification.urlCredential,
                    dateReceived: certification.dateReceived,
                });

                // add certification to db
                await newCertification.save();
                console.log(`${newCertification.title} added successfully.`);
            }
        }

        console.log('All certifications added.');
    } catch (error) {
        console.error('Error adding certifications:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addCertifications();
