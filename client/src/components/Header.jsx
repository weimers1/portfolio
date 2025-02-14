import Icon from '@mdi/react';
import Collapsible from './Collapsible';
import { mdiMenu } from '@mdi/js';

function Header(props) {
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
                            {props.pages.map((page) => {
                                return (
                                    <a
                                        key={page.path}
                                        href={page.path}
                                        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 lg:mx-10 text-shadow-cyan"
                                    >
                                        {page.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                }
            />
        </header>
    );
}

export default Header;
