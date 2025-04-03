function Project({ projectObj, displayTechnologies }) {
    console.log(projectObj);
    const image = (
        <img
            src={projectObj.imageFilePath}
            className="border-3 lg:border-6 border-cyan-600 rounded-full w-20 lg:w-35 h-20 lg:h-35 shadow-2xl shadow-cyan-600 bg-cyan-600/50"
        />
    );
    return (
        <div className="text-white text-shadow-cyan place-items-center py-8 lg:py-12">
            <div
                className="grid grid-cols-1 lg:grid-cols-2 place-items-center lg:relative text-sm lg:text-xl w-50 lg:w-200"
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
                <div className="pt-4 w-75 lg:w-200 place-items-center grid grid-cols-6">
                    {projectObj.techStack.map((technology, i) => {
                        return (
                            <img
                                key={technology._id}
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
        </div>
    );
}

export default Project;
