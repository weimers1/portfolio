import { Icon } from '@iconify/react/dist/iconify.js';
import { formatMongoDBDate } from '../utils/date';

function Certification({ certificationObj }) {
    return (
        <div
            className="text-white text-shadow-cyan place-items-center pb-8 pt-2 lg:pb-0 lg:pt-0"
            data-aos="fade-up"
        >
            <div className="w-45 h-45 lg:w-70 lg:h-70 bg-cyan-600/50 rounded-full border-3 lg:border-6 border-cyan-600 shadow-2xl shadow-cyan-600 text-sm lg:text-xl text-center place-items-center mb-4 lg:mb-0">
                <div
                    className={`py-1 lg:py-2 mt-5 lg:mt-7 ${
                        certificationObj.title.length > 50
                            ? ''
                            : 'pt-5 lg:pt-10'
                    } border-b w-35 lg:w-50 text-shadow-cyan`}
                >
                    {certificationObj.title}
                </div>
                <div className="my-1 lg:my-2 text-shadow-cyan">
                    {formatMongoDBDate(certificationObj.dateReceived)}
                </div>
                <div className="border-t w-20 lg:w-35 flex justify-center pt-2 lg:pt-3 text-shadow-cyan">
                    <a
                        href={certificationObj.urlCredential}
                        target="_blank"
                    >
                        <Icon
                            className="w-6 h-6 lg:w-10 lg:h-10"
                            icon="mdi-certificate"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Certification;
