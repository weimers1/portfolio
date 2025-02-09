import Icon from '@mdi/react';
import Collapsible from './Collapsible';
import { mdiMenu } from '@mdi/js';

function Header() {
    return (
        <header className="w-full flex items-center justify-between flex-wrap bg-transparent p-6">
            <Collapsible
                collapseButtonContent={
                    <div className="block lg:hidden">
                        <Icon
                            path={mdiMenu}
                            size={1}
                        />
                    </div>
                }
                collapseBodyContent={
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4"
                            >
                                Docs
                            </a>
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4"
                            >
                                Examples
                            </a>
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200"
                            >
                                Blog
                            </a>
                        </div>
                        <div>
                            <a
                                href="#"
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                }
            />
        </header>
    );
}

export default Header;
