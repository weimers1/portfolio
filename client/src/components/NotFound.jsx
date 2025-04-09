import PageLayout from './PageLayout';

function NotFound(props) {
    return (
        <PageLayout pages={props.pages}>
            <div className="place-items-center pt-35 lg:pt-40">
                <div className="w-50 h-50 lg:w-70 lg:h-70 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 place-items-center text-white text-2xl lg:text-3xl text-shadow-cyan text-center pt-2">
                    <div className="pt-12 lg:pt-20 pb-3">Page Not Found</div>
                    <a href="/">
                        <div className="border-t w-40 lg:w-45 pt-3">
                            Back to Home
                        </div>
                    </a>
                </div>
            </div>
        </PageLayout>
    );
}

export default NotFound;
