import React from 'react';
import Tooltip from './Tooltip';

function MultiSegmentProgressBar({ data }) {
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const skewFactor = 0.6; // Adjust this value

    // Calculate the skewed proportions
    const skewedProportions = data.map((item) =>
        Math.pow(item.value / totalValue, skewFactor)
    );

    // Calculate the sum of the skewed proportions
    const sumSkewedProportions = skewedProportions.reduce(
        (sum, prop) => sum + prop,
        0
    );

    return (
        <div className="relative w-full bg-gray-200 h-6">
            {data.map((item, index) => {
                const widthPercentage = (item.value / totalValue) * 100;
                // Normalize the skewed proportion and calculate the final skewed width
                const normalizedSkewedProportion =
                    skewedProportions[index] / sumSkewedProportions;
                const skewedWidthPercentage = normalizedSkewedProportion * 100;

                // Calculate the left position based on the *normalized* skewed widths of previous segments
                const previousWidthPercentage = data
                    .slice(0, index)
                    .reduce((sum, prev, i) => {
                        const prevSkewedProportion = skewedProportions[i];
                        const normalizedPrevSkewedProportion =
                            prevSkewedProportion / sumSkewedProportions;
                        return sum + normalizedPrevSkewedProportion * 100;
                    }, 0);

                return (
                    <Tooltip
                        key={index}
                        text={'test' + index}
                    >
                        <div
                            className={`absolute h-full px-3 ${item.color}`}
                            style={{
                                width: `${skewedWidthPercentage}%`,
                                left: `${previousWidthPercentage}%`,
                            }}
                        >
                            {item.label} {skewedWidthPercentage.toFixed(2)}%
                        </div>
                    </Tooltip>
                );
            })}
        </div>
    );
}

export default MultiSegmentProgressBar;
