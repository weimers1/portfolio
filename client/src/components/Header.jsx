import Icon from '@mdi/react';
import Collapsible from './Collapsible';
import { mdiMenu } from '@mdi/js';

function Header() {
    return (
        <header className="w-full flex items-center justify-between flex-wrap bg-transparent p-6 lg:text-lg lg:pb-10">
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
                        <div className="lg:flex-grow">
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-400 mr-4"
                            >
                                Docs
                            </a>
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-400 mr-4"
                            >
                                Examples
                            </a>
                            <a
                                href="#responsive-header"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-400"
                            >
                                Blog
                            </a>
                        </div>
                    </div>
                }
            />
        </header>
    );
}

export default Header;
