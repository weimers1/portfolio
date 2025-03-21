function Job({ jobObj }) {
    return (
        <div className="place-items-center">
            <div className="text-white text-lg lg:text-2xl">
                {jobObj.titleCompany}
            </div>
        </div>
    );
}

export default Job;
