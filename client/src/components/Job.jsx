import React from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';
import { formatMongoDBDate } from '../utils/date.js';

function Job({ jobObj }) {
    return (
        <div className="text-white text-shadow-cyan text-lg lg:text-2xl my-8 text-center place-items-center">
            <div className="pb-4">
                <span className="border-b inline-block pb-4 px-2">
                    {jobObj.titlePosition}
                </span>
            </div>
            <div className="w-45">
                <span className="border-b inline-block pb-4 px-2">
                    {jobObj.titleCompany}
                </span>
            </div>
            <div className="pt-4">
                <span className="border-b inline-block pb-4 px-2">
                    {formatMongoDBDate(jobObj.dateStart)} -{' '}
                    {jobObj.dateEnd
                        ? formatMongoDBDate(jobObj.dateEnd)
                        : 'Present'}
                </span>
            </div>
            <div className="pt-4 text-sm lg:text-xl w-75 lg:w-200 text-start">
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
        </div>
    );
}

export default Job;
