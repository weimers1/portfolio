function Project({ projectObj, displayTechnologies }) {
    const image = (
        <img
            src={projectObj.imageFilePath}
            className="border-3 lg:border-6 border-cyan-600 rounded-full w-20 lg:w-35 h-20 lg:h-35 shadow-2xl shadow-cyan-600 bg-cyan-600/50"
        />
    );
    return (
        <div className="text-white text-shadow-cyan place-items-center py-8 lg:py-12">
            <a
                href={projectObj.urlWebsite}
                className="hidden lg:block lg:pb-10"
                target="_blank"
            >
                {image}
            </a>
            <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center lg:place-items-auto text-sm lg:text-xl w-50 lg:w-200">
                <a
                    href={projectObj.urlWebsite}
                    className="lg:hidden"
                    target="_blank"
                >
                    {image}
                </a>
                <div className="py-5 lg:px-5 lg:py-0 border-b lg:border-b-0 w-40 lg:w-full text-xl lg:text-3xl text-center lg:text-end text-shadow-cyan">
                    {projectObj.titleProject}
                </div>
                <div className="my-5 lg:my-0 lg:ps-5 lg:border-s lg:col-span-2 lg:w-full text-lg lg:text-2xl text-center lg:text-start text-shadow-cyan">
                    {projectObj.description}
                </div>
            </div>
            {displayTechnologies ? (
                <div className="lg:pt-4 w-75 lg:w-200 place-items-center grid grid-cols-6">
                    {projectObj.techStack.map((technology) => {
                        return (
                            <img
                                key={technology._id}
                                src={
                                    technology.imgFilePath
                                        ? technology.imgFilePath
                                        : '/src/assets/images/default.svg'
                                }
                                width="70%"
                                className="py-2 lg:py-4 lg:w-20"
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
