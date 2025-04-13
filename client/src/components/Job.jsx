import React from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';
import { formatMongoDBDate } from '../utils/date.js';

function Job({ jobObj }) {
    return (
        <div
            className="text-white text-shadow-cyan place-items-center pb-20 lg:pb-40"
            data-aos="fade-up"
        >
            <div className="w-45 h-45 lg:w-70 lg:h-70 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 text-md lg:text-2xl text-center place-items-center mb-4">
                <div className="pt-1 lg:pb-3 pt-12 lg:pt-16">
                    <span className="border-b inline-block pb-1 lg:pb-3 px-2">
                        {jobObj.titlePosition}
                    </span>
                </div>
                <div className="w-50">
                    <span className="border-b inline-block pb-1 pt-1 lg:pb-3 px-2">
                        {jobObj.titleCompany}
                    </span>
                </div>
                <div className="pt-1 lg:pt-3">
                    <span className="px-2">
                        {formatMongoDBDate(jobObj.dateStart)} -{' '}
                        {jobObj.dateEnd
                            ? formatMongoDBDate(jobObj.dateEnd)
                            : 'Present'}
                    </span>
                </div>
            </div>
            <div className="pt-4 lg:pt-8 text-sm lg:text-xl w-75 lg:w-200 text-start">
                <div className="grid grid-cols-12 gap-y-4">
                    {jobObj.tasks.map((task, i) => {
                        return (
                            <React.Fragment key={jobObj._id + '-job-icon-' + i}>
                                <div className="col-span-2 lg:col-span-1">
                                    <Icon
                                        path={mdiCheckCircleOutline}
                                        size={1}
                                    />
                                </div>
                                <div className="col-span-10 lg:col-span-11">
                                    {task}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <div className="pt-4 w-75 lg:w-200 place-items-center grid grid-cols-6">
                {jobObj.techStack.map((technology, i) => {
                    return (
                        <img
                            key={'technology-' + i}
                            src={
                                technology.filePathLogo
                                    ? technology.filePathLogo
                                    : '/src/assets/images/default.svg'
                            }
                            width="70%"
                            className="py-2 lg:py-4 lg:w-20"
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Job;
