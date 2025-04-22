import React from 'react';
import Tooltip from './Tooltip';
import useScreenSize from '../hooks/useScreenSize';

function MultiSegmentProgressBar({ data }) {
    const screenSize = useScreenSize();

    const totalSize = data.reduce((sum, item) => sum + item.value, 0);

    // use a skew to show labels on the segments
    const skewFactor = screenSize.isLarge ? 0.5 : 0.35;
    const skewedSegments = data.map((item) =>
        Math.pow(item.value / totalSize, skewFactor)
    );
    const sumSkewedSegments = skewedSegments.reduce(
        (sum, segmentSize) => sum + segmentSize,
        0
    );

    return (
        <div className="relative w-full bg-gray-200 h-6 lg:h-8">
            {data.map((item, index) => {
                const widthPercentage = (item.value / totalSize) * 100;
                const skewedWidthPercentage =
                    (skewedSegments[index] / sumSkewedSegments) * 100;
                const previousWidthPercentage = data
                    .slice(0, index)
                    .reduce((sum, prev, i) => {
                        const prevSkewedSegment = skewedSegments[i];
                        return (
                            sum + (prevSkewedSegment / sumSkewedSegments) * 100
                        );
                    }, 0);

                return (
                    <div
                        className={`absolute h-full ps-1 lg:ps-2 ${item.color}`}
                        style={{
                            width: `${skewedWidthPercentage}%`,
                            left: `${previousWidthPercentage}%`,
                        }}
                    >
                        <Tooltip
                            key={index}
                            text={widthPercentage.toFixed(2) + '%'}
                        >
                            <div className="text-xs lg:text-lg flex items-center h-full">
                                {item.label}
                            </div>
                        </Tooltip>
                    </div>
                );
            })}
        </div>
    );
}

export default MultiSegmentProgressBar;
