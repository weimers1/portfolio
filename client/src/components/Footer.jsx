import Icon from '@mdi/react';
import { mdiCodeBraces, mdiGithub, mdiLinkedin } from '@mdi/js';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 lg:text-lg pt-10">
            <div className="text-xs">&copy; {currentYear} Samuel Weimer</div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
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
            <div className="flex justify-center lg:justify-end">
                <a
                    className="p-3"
                    href="https://www.github.com/weimers1"
                    target="_blank"
                >
                    <Icon
                        path={mdiGithub}
                        size={1}
                        title="GitHub"
                    />
                </a>
                <a
                    className="p-3"
                    href="https://www.linkedin.com/in/sam-weimer/"
                    target="_blank"
                >
                    <Icon
                        path={mdiLinkedin}
                        size={1}
                        title="LinkedIn"
                    />
                </a>
                <a
                    className="p-3"
                    href="https://leetcode.com/u/samweimer7/"
                    target="_blank"
                >
                    <Icon
                        path={mdiCodeBraces}
                        size={1}
                        title="LeetCode"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
