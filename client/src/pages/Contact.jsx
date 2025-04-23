import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import { TURNSTILE_SITE_KEY } from '../../config';

function Contact(props) {
    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);
    const [turnstileComplete, setTurnstileComplete] = useState(false);
    const [turnstileLoaded, setTurnstileLoaded] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [socialsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/socials'),
                ]);

                setSocials(socialsResponse.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
                // @TODO: email errors
            }
        };

        fetchAllData();

        const completeTurnstile = () => {
            setTurnstileLoaded(true);
            window.turnstileCallback = () => {
                setTurnstileComplete(true);
            };
        };

        if (!window.turnstile) {
            const script = document.createElement('script');
            script.src =
                'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=turnstileCallback';
            script.defer = true;
            script.onload = () => {
                completeTurnstile();
            };
            document.head.appendChild(script);
        } else {
            completeTurnstile();
        }

        return () => {
            delete window.turnstileCallback;
        };
    }, []);

    return (
        <PageLayout
            pages={props.pages}
            loading={loading}
        >
            <section className="place-items-center lg:pt-5">
                <div className="flex flex-wrap justify-center gap-5 lg:gap-20 pt-4 w-75 lg:w-200 lg:border-b pb-5">
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
                                    className="w-12 h-12 lg:w-18 lg:h-18"
                                />
                            </a>
                        );
                    })}
                    <a
                        className="p-3 text-white hover:text-cyan-300"
                        href="mailto:samweimer7@gmail.com"
                        target="_blank"
                        key="gmail"
                    >
                        <Icon
                            icon="mdi-gmail"
                            title="Gmail"
                            className="w-12 h-12 lg:w-18 lg:h-18"
                        />
                    </a>
                </div>
            </section>

            <section className="place-items-center w-full">
                <form
                    action="/contact"
                    method="POST"
                >
                    <div className="w-75 lg:w-200 mb-0 pb-0">
                        <input
                            type="text"
                            className="w-full bg-white rounded-lg text-black p-3 lg:p-5 lg:mt-15"
                            placeholder="Enter your email"
                        ></input>
                        <textarea
                            className="w-full h-40 lg:h-60 bg-white rounded-lg text-black p-3 lg:p-5 mt-10 lg:mt-15"
                            placeholder="Enter a message"
                        ></textarea>
                    </div>
                    {turnstileLoaded && (
                        <div
                            className="cf-turnstile mt-10 lg:mt-15"
                            data-sitekey={TURNSTILE_SITE_KEY}
                        ></div>
                    )}
                    {turnstileComplete && (
                        <button
                            type="submit"
                            value="Submit"
                            className="bg-cyan-300/35 hover:bg-cyan-400/35 hover:cursor-pointer p-3 rounded-md flex float-start"
                        >
                            Send Message
                        </button>
                    )}
                </form>
            </section>
        </PageLayout>
    );
}

export default Contact;
