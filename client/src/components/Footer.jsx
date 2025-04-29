import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { BASE_URL_API } from '../../config';

function Footer(props) {
    const currentYear = new Date().getFullYear();

    const [socials, setSocials] = useState([]);
    useEffect(() => {
        axios
            .get(BASE_URL_API + '/socials')
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
            <div className="text-xs lg:pt-2">
                &copy; {currentYear} Samuel Weimer
            </div>
            <div className="lg:flex items-center lg:justify-between">
                {props.pages.map((page) => {
                    return (
                        <div
                            key={'footer-' + page.path}
                            className="block mt-4 lg:inline-block lg:mt-0 lg:text-center"
                        >
                            <a
                                href={page.path}
                                className="text-white hover:text-cyan-300 text-shadow-cyan"
                            >
                                {page.title}
                            </a>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center lg:justify-end">
                {socials.map((social) => {
                    return (
                        <a
                            className="p-3 text-white hover:text-cyan-300"
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
