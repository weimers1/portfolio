import React, { useState } from 'react';

function Tooltip({ text, children }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div className="w-full">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute bottom-5 bg-gray-800 text-white text-sm rounded py-2 px-3 shadow-lg z-1">
                    {text}
                </div>
            )}
        </div>
    );
}

export default Tooltip;
