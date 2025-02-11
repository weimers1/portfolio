import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const [socials, setSocials] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4000/socials')
            .then((response) => {
                setSocials(response.data);
            })
            .catch((error) => {
                // @TODO: email errors
                console.log(error);
            });
    }, []);

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
                {socials.map((social) => {
                    return (
                        <a
                            className="p-3"
                            href={social.urlWebsite}
                            target="_blank"
                            key={social._id}
                        >
                            <Icon
                                icon={social.icon}
                                title={social.title}
                                className="w-5 h-5 lg:w-7 lg:h-7"
                            />
                        </a>
                    );
                })}
            </div>
        </footer>
    );
}

export default Footer;
