import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { GiCardExchange } from "react-icons/gi";
import { FcDataConfiguration } from "react-icons/fc";
import { PiStrategyBold } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const sidebarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
             {!isSidebarOpen && (
                <button
                    className="p-2 bg-gray-800 text-white fixed top-18 left-2 z-50 sm:hidden"
                    onClick={sidebarHandler}
                >
                    ☰
                </button>
            )}

            {/* Desktop Sidebar */}
            <div className="w-70 absolute sm:relative bg-0b1926 shadow h-full flex-col justify-between hidden sm:flex" style={{ backgroundColor: '#0b1926' }}>
                <div className="px-8">
                    <div className="h-16 w-full flex items-center"></div>
                    <ul className="">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <FaHome color='white' />
                                <span className="text-sm ml-2">Home</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <GiCardExchange color='white' />
                                <span className="text-sm ml-2">Exchange</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <FcDataConfiguration color='white' />
                                <span className="text-sm ml-2">API configuration</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <PiStrategyBold color='white' />
                                <span className="text-sm ml-2">Strategy</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <FaCoins color='white' />
                                <span className="text-sm ml-2">Crypto Pair</span>
                            </div>
                        </li>
                    </ul>
                    <ul className="pt-12 mt-50px">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <MdOutlinePostAdd color='white' />
                                <span className="text-sm ml-2">Add Strategy</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <MdOutlineCardMembership color='white' />
                                <span className="text-sm ml-2">Pricing</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <CgProfile color='white' />
                                <span className="text-sm ml-2">Profile</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-4">
                            <div className="flex items-center">
                                <MdLogout color='white' />
                                <span className="text-sm ml-2">Logout</span>
                            </div>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-12 mb-8 w-full">
                        <div className="relative">
                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4"></div>
                            {/* <input className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" /> */}
                        </div>
                    </div>
                </div>
                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {/* Open Button for Sidebar on Mobile View */}
           
            <div className={`w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out ${isSidebarOpen ? '' : 'hidden'}`} id="mobile-nav">
           
            <div className="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer" id="mobile-toggler" onClick={sidebarHandler}>
                    {isSidebarOpen ? (
                        <IoClose size={20} color="white" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={6} cy={10} r={2} />
                            <line x1={6} y1={4} x2={6} y2={8} />
                            <line x1={6} y1={12} x2={6} y2={20} />
                            <circle cx={12} cy={16} r={2} />
                            <line x1={12} y1={4} x2={12} y2={14} />
                            <line x1={12} y1={18} x2={12} y2={20} />
                            <circle cx={18} cy={7} r={2} />
                            <line x1={18} y1={4} x2={18} y2={5} />
                            <line x1={18} y1={9} x2={18} y2={20} />
                        </svg>)}
                </div>
                <div className="px-8">
                    <div className="h-16 w-full flex items-center"></div>
                    <ul className="">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <FaHome color='white' />
                                <span className="text-sm ml-2">Home</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <GiCardExchange color='white' />
                                <span className="text-sm ml-2">Exchange</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <FcDataConfiguration color='white' />
                                <span className="text-sm ml-2">API configuration</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <PiStrategyBold color='white' />
                                <span className="text-sm ml-2">Strategy</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <FaCoins color='white' />
                                <span className="text-sm ml-2">Crypto Pair</span>
                            </div>
                        </li>
                    </ul>
                    <ul className="pt-12">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <MdOutlinePostAdd color='white' />
                                <span className="text-sm ml-2">Add Strategy</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <MdOutlineCardMembership color='white' />
                                <span className="text-sm ml-2">Pricing</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <CgProfile color='white' />
                                <span className="text-sm ml-2">Profile</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <MdLogout color='white' />
                                <span className="text-sm ml-2">Logout</span>
                            </div>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-48 mb-8 w-full">
                        <div className="relative">
                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4"></div>
                            {/* <input className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" /> */}
                        </div>
                    </div>
                </div>
                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                        <li className="cursor-pointer text-white pt-5 pb-3"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
