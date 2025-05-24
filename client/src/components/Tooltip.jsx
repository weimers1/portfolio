import React, { useState } from 'react';

function Tooltip({ text, children, placement = 'bottom-6 lg:bottom-8' }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full"
            >
                {children}
            </div>
            {isVisible && (
                <div
                    className={`absolute ${placement} left-1/2 -translate-x-1/2 bg-cyan-500/35 text-white text-sm lg:text-lg rounded py-2 px-3 text-shadow-cyan z-1 min-w-22 lg:min-w-27 text-center`}
                >
                    {text}
                </div>
            )}
        </>
    );
}

export default Tooltip;
