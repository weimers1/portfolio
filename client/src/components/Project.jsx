function Project({ projectObj, displayTechnologies, displayViews }) {
    const image = (
        <img
            src={projectObj.filePathLogo}
            className="border-3 lg:border-6 border-cyan-600 rounded-full w-20 lg:w-35 h-20 lg:h-35 shadow-2xl shadow-cyan-600 bg-cyan-600/50"
        />
    );
    return (
        <div
            className="text-white text-shadow-cyan place-items-center pb-20 lg:pb-40"
            data-aos="fade-up"
        >
            <a
                href={projectObj.urlWebsite}
                className="hidden lg:block lg:pb-5"
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
                <div className="py-5 lg:pt-7 lg:px-5 border-b lg:border-b-0 w-40 lg:w-full text-xl lg:text-3xl text-center lg:text-end text-shadow-cyan">
                    {projectObj.titleProject}
                </div>
                <div className="my-5 lg:mt-7 lg:ps-5 lg:pb-0 lg:border-s lg:col-span-2 lg:w-full text-lg lg:text-2xl text-center lg:text-start text-shadow-cyan">
                    {projectObj.description}
                </div>
            </div>
            {displayViews ? (
                <div
                    className={`mb-5 lg:mb-5 lg:pt-4 w-75 lg:w-200 place-items-center ${
                        displayTechnologies ? 'border-b' : ''
                    }`}
                >
                    <img
                        src={
                            projectObj.filePathViews
                                ? projectObj.filePathViews
                                : '/src/assets/images/default.svg'
                        }
                        width="90%"
                        className="pb-5 lg:pb-10"
                    />
                </div>
            ) : (
                <></>
            )}
            {displayTechnologies ? (
                <div className="lg:pt-4 w-75 lg:w-200 place-items-center grid grid-cols-6">
                    {projectObj.techStack.map((technology) => {
                        return (
                            <img
                                key={projectObj._id + '-' + technology._id}
                                src={
                                    technology.filePathLogo
                                        ? technology.filePathLogo
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
