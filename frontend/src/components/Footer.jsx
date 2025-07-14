// src/components/Footer.jsx
import { Github, Linkedin, Mail, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-sm text-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
                {/* Logo and tagline */}
                <div>
                    <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
                        <Utensils className="w-6 h-6" />
                        <span className="text-red-500">
                            Bite<span className="text-gray-700">Runner</span>
                        </span>
                    </div>

                    <p className="mt-2 text-gray-600">
                        Powered by flavor. Delivered with speed.
                    </p>
                </div>

                <div className="grid gap-8 grid-cols-2">
                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                            Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-red-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className="hover:text-red-500">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:ammarhashmi113@gmail.com"
                                    className="hover:text-red-500"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                            Connect
                        </h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                <a
                                    href="https://github.com/ammarhashmi113"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500"
                                >
                                    My GitHub
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4" />
                                <a
                                    href="https://www.linkedin.com/in/ammar-hashmi-439424263/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                <a
                                    href="https://github.com/ammarhashmi113/biterunner"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500"
                                >
                                    Project Repo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-200">
                &copy; {new Date().getFullYear()} Biterunner. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
