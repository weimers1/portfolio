import React from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';
import CircularHexGrid from './CircularHexGrid';
import { formatMongoDBDate } from '../utils/date.js';

function Job({ jobObj }) {
    return (
        <div className="text-white text-shadow-cyan text-lg lg:text-2xl my-8 lg:mx-20 text-center place-items-center">
            <div className="pb-4">
                <span className="border-b inline-block pb-4 px-2 lg:px-4">
                    {jobObj.titlePosition}
                </span>
            </div>
            <div className="w-45">
                <span className="border-b inline-block pb-4 px-2 lg:px-4">
                    {jobObj.titleCompany}
                </span>
            </div>
            <div className="pt-4">
                <span className="border-b inline-block pb-4 px-2 lg:px-4">
                    {formatMongoDBDate(jobObj.dateStart)} -{' '}
                    {jobObj.dateEnd
                        ? formatMongoDBDate(jobObj.dateEnd)
                        : 'Present'}
                </span>
            </div>
            <div className="pt-4 text-sm w-75 text-start">
                <div className="grid grid-cols-7 gap-y-4">
                    {jobObj.tasks.map((task, i) => {
                        return (
                            <React.Fragment key={jobObj._id + '-job-icon-' + i}>
                                <div className="col-span-1">
                                    <Icon
                                        path={mdiCheckCircleOutline}
                                        size={1}
                                    />
                                </div>
                                <div className="col-span-6">{task}</div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <CircularHexGrid
                hexagonsContent={jobObj.techStack}
                backgroundId={'circle-background-' + jobObj._id}
            />
            <svg className="hidden">
                <symbol
                    id={'circle-background-' + jobObj._id}
                    viewBox="-45 -42 100 100"
                >
                    <circle
                        cx="0"
                        cy="3"
                        r={jobObj.techStack.length < 7 ? 25 : 30}
                        stroke="rgba(0, 146, 184, 1)"
                        strokeWidth="1"
                        fill="rgba(0, 146, 184, 0.5)"
                    />
                </symbol>
            </svg>
        </div>
    );
}

export default Job;
