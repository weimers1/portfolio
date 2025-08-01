import mongoose from 'mongoose';
import 'dotenv/config.js';
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
import { Technology } from '../models/technology.js';
import { Job, getJobs } from '../models/job.js';

async function addJobs() {
    try {
        // connect to database
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // jobs to be added
        const jobData = [
            {
                titleCompany: 'Corning, Inc.',
                titlePosition: 'Fullstack Web Dev',
                description:
                    'Developed and maintained large-scale research applications with accessible and intuitive user interfaces, and robust backend APIs using Bootstrap, Vue.js, jQuery, and ColdFusion',
                tasks: [
                    'Updated and maintained 100+ existing applications with over 10,000 users to preserve compatibility with newer versions of software and programming languages',
                    'Refactored metrics reporting pages to reduce load times by over 50% and enhance user experience',
                    'Collaborated cross-functionally to create high-impact, multi-user request systems and 10+ robust RESTful API endpoints following SDLC and evolving requirements',
                    'Handled data validation, entry, and management through custom logic, existing validation engines, and secure CRUD operations written with ColdFusion and Oracle SQL',
                ],
                techStack: [
                    'HTML',
                    'CSS',
                    'Bootstrap',
                    'JavaScript',
                    'Vue.js',
                    'jQuery',
                    'SQL',
                    'Adobe ColdFusion',
                    'Java',
                    'Python',
                    'Visual Studio Code',
                ],
                dateStart: new Date('2022-02-02T00:00:00.000Z'),
                dateEnd: new Date('2024-01-02T00:00:00.000Z'),
            },
            {
                titleCompany: 'CS Recitations, LLC',
                titlePosition: 'Programming Teacher',
                description:
                    'Teach and mentor remote middle and high school students in modern programming languages, best coding practices, and core computer science concepts, including front-end/back-end fundamentals, OOP, data structures, and algorithms',
                tasks: [
                    'Regularly tutor middle through high school students in Python, Java, JavaScript, HTML, and full-stack web development concepts, and other modern practical programming languages',
                    'Stay up to date with the latest best practices, modern frameworks, and current programming trends, including front-end and back-end web development practices, to provide effective and relevant instruction',
                    'Customize learning experiences by teaching core programming concepts, application design, and code structure, preparing students for AP courses, nationwide contests, and practical application development challenges',
                ],
                techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java'],
                dateStart: new Date('2021-09-02T00:00:00.000Z'),
                dateEnd: null,
            },
            {
                titleCompany: 'VCOM',
                titlePosition: 'Fullstack Web Dev',
                description:
                    'Develop, analyze, and maintain large-scale learning management system and medical logging application for medical students, clinical staff, and preceptors to optimize educational experience and improve data management, tracking, and validation for global medical research',
                tasks: [
                    'Configure remote Linux environment with Nginx for a secure, consistent, and streamlined development workflow',
                    'Rewrite legacy learning management system and medical logging application using React.js and Next.js to improve scalability, documentation, and user experience for 1000+ active students',
                    'Cut statistics dashboard load times by over 90% by reducing queries to more recent and relevant data, and implementing best query practices including indexing and effective joining',
                    'Migrate 7000+ student and preceptor records from obsolete system to facilitate medical log data confirmation, validation, and long-term support',
                ],
                techStack: [
                    'HTML',
                    'CSS',
                    'JavaScript',
                    'jQuery',
                    'React',
                    'PHP',
                    'Next.js',
                    'Express.js',
                    'Node.js',
                    'MySQL',
                    'Docker',
                    'Visual Studio Code',
                    'Nginx',
                    'Jira',
                    'GitHub',
                ],
                dateStart: new Date('2024-06-02T00:00:00.000Z'),
                dateEnd: null,
            },
        ];

        for (const job of jobData) {
            // find existing job
            const existingJob = await Job.findOne({
                titleCompany: job.titleCompany,
                titlePosition: job.titlePosition,
            });

            // get technologies based on names
            const technologyIds = [];
            for (const techName of job.techStack) {
                const technology = await Technology.findOne({ name: techName });
                if (technology) {
                    technologyIds.push(technology._id);
                } else {
                    console.warn(`Technology "${techName}" not found.`);
                }
            }

            // update duplicates
            if (existingJob) {
                const updates = {};
                if (job.description !== existingJob.description)
                    updates.description = job.description;
                if (
                    JSON.stringify(job.tasks) !==
                    JSON.stringify(existingJob.tasks)
                )
                    updates.tasks = job.tasks;
                if (
                    JSON.stringify(technologyIds) !==
                    JSON.stringify(existingJob.techStack)
                )
                    updates.techStack = technologyIds;
                if (job.dateStart.getTime() !== existingJob.dateStart.getTime())
                    updates.dateStart = job.dateStart;
                if (job.dateEnd?.getTime() !== existingJob.dateEnd?.getTime())
                    updates.dateEnd = job.dateEnd;

                if (Object.keys(updates).length > 0) {
                    await Job.findByIdAndUpdate(existingJob._id, updates);
                    console.log(
                        `${job.titleCompany} "${job.titlePosition}" updated successfully.`
                    );
                } else {
                    console.log(
                        `${job.titleCompany} "${job.titlePosition}" already up to date.`
                    );
                }
            } else {
                // create job
                const newJob = new Job({
                    titleCompany: job.titleCompany,
                    titlePosition: job.titlePosition,
                    description: job.description,
                    tasks: job.tasks,
                    techStack: technologyIds,
                    dateStart: job.dateStart,
                    dateEnd: job.dateEnd,
                });

                // add job to db
                await newJob.save();
                console.log(
                    `${newJob.titleCompany} "${newJob.titlePosition}" added successfully.`
                );
            }
        }

        console.log('All jobs added.');
    } catch (error) {
        console.error('Error adding jobs:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

addJobs();
