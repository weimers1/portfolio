import { useState } from 'react';
import useScreenSize from '../hooks/useScreenSize';

function Collapsible(props) {
    const screenSize = useScreenSize();

    const [isShown, setIsShown] = useState(false);
    const toggleContent = () => {
        setIsShown(!isShown);
    };

    return (
        <>
            {props.useButton ? (
                <button
                    className="flex items-center px-3 py-2"
                    type="button"
                    onClick={toggleContent}
                >
                    {props.collapseButtonContent}
                </button>
            ) : (
                <a
                    className="flex items-center px-3 py-2"
                    onClick={toggleContent}
                >
                    {props.collapseButtonContent}
                </a>
            )}
            {isShown || (screenSize.isLarge && !props.collapsibleAlways) ? (
                <>{props.collapseBodyContent}</>
            ) : (
                <></>
            )}
        </>
    );
}

export default Collapsible;
