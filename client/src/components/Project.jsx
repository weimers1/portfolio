function Project({ projectObj, displayTechnologies }) {
    const image = (
        <img
            src={projectObj.imageFilePath}
            className="border-3 lg:border-6 border-cyan-600 rounded-full w-20 lg:w-35 h-20 lg:h-35 shadow-2xl shadow-cyan-600 bg-cyan-600/50"
        />
    );
    return (
        <>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 pt-3 pb-10 lg:py-10 w-50 lg:w-200 place-items-center lg:relative"
                key={projectObj._id}
            >
                <a
                    href={projectObj.urlWebsite}
                    target="_blank"
                >
                    {image}
                </a>
                <div className="mt-5 text-lg lg:text-2xl text-center lg:text-start lg:absolute lg:left-100 text-shadow-cyan">
                    {projectObj.description}
                </div>
            </div>
            {displayTechnologies ? (
                <div className="place-items-center grid grid-cols-4 lg:grid-cols-6 w-75 lg:w-250">
                    {projectObj.techStack.map((technology, i) => {
                        return (
                            <img
                                key={'technology-' + i}
                                src={
                                    technology.imgFilePath
                                        ? technology.imgFilePath
                                        : '/src/assets/images/default.svg'
                                }
                                width="70%"
                                className="py-2 lg:py-4"
                            />
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Project;
