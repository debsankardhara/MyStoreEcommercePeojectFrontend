import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white  border-t border-orange-200 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-xl font-bold text-orange-600">MyStore</div>
                    <p className="mt-2 text-gray-600 text-center md:text-left max-w-sm">
                        Discover a world of quality products. Shop with confidence and style.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-orange-500">Quick Links</h3>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Shop</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">About Us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-lg font-semibold text-orange-500">Customer Service</h3>
                    <ul className="mt-4 space-y-2 text-gray-600">
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">FAQ</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Shipping & Returns</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-600 transition duration-300">Terms of Service</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media & Newsletter */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-semibold text-orange-500">Follow Us</h3>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-orange-600 transition duration-300">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-orange-600 transition duration-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-orange-600 transition duration-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-orange-600 transition duration-300">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-orange-100 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} MyStore. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;