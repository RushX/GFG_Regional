import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';


function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex items-center justify-between gap-96 mx-5 mt-6">
            <div className="brandName text-2xl font-bold text-white cursor-pointer">वैद्य-Chain</div>
            <div className="hidden md:flex items-center justify-center gap-10">
                <Link to="/" className="text-sm font-sans lin font-medium hover:text-white duration-300">Home</Link>
                <Link to="/about" className="text-sm font-sans lin font-medium hover:text-white duration-300">About</Link>
                <Link to="/faqs" className="text-sm font-sans lin font-medium hover:text-white duration-300">FAQs</Link>
                <Link to="/login" className="text-sm font-sans lin font-medium hover:text-white duration-300">Login</Link>
                <Link to="/signup" className="text-sm font-sans lin font-medium hover:text-white duration-300">SignUp</Link>
                <Link to="/verify" className="box-border flex flex-row items-start p-2 gap-2 w-36 h-8 rounded-full bg-white transition duration-300 hover:bg-gray-200 hover:shadow-md box-border flex flex-row items-center justify-center p-2 gap-2 w-36 h-8 bg-white rounded-full text-sm font-sans font-medium">Verify Licence</Link>
            </div>
            <div className="md:hidden">
                <button
                    className="text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M14.293 5.293a1 1 0 010 1.414L9.414 11l4.879 4.879a1 1 0 11-1.414 1.414L8 12.414l-4.879 4.879a1 1 0 11-1.414-1.414L6.586 11 1.707 6.121a1 1 0 011.414-1.414L8 9.586l4.879-4.879a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <Link to="/" className="text-sm font-sans lin font-medium hover:text-white duration-300">Home</Link>
                        <Link to="/about" className="text-sm font-sans lin font-medium hover:text-white duration-300">About</Link>
                        <Link to="/faqs" className="text-sm font-sans lin font-medium hover:text-white duration-300">FAQs</Link>
                        <Link to="/login" className="text-sm font-sans lin font-medium hover:text-white duration-300">Login</Link>
                        <Link to="/signup" className="text-sm font-sans lin font-medium hover:text-white duration-300">SignUp</Link>
                        <Link to="/signup" className="box-border flex flex-row items-start p-2 gap-2 w-36 h-8 rounded-full bg-white transition duration-300 hover:bg-gray-200 hover:shadow-md box-border flex flex-row items-center justify-center p-2 gap-2 w-36 h-8 bg-white rounded-full text-sm font-sans font-medium">Verify Licence</Link>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Header