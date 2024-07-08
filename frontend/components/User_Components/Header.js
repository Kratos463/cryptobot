import React, { useContext, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { AuthContext } from '../../Context/AuthContext';
import Link from 'next/link';

function Header() {
    const initialStyle = [true, false, false, false, false, false];
    const [style, setStyle] = useState(initialStyle);
    const [dropDown, setDropDown] = useState(false);
    const [text, setText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const [selected, setSelected] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleItemClick = (index) => {
        setSelected(index);
        if (index === 4) {
            setIsDropdownOpen(!isDropdownOpen);
        } else {
            setIsDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logout Successful');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleProfile = () => {
        router.push('/Profile/ProfileDashboard');
    };
    const handleBot = () => {
        router.push('/page/Mybots');
    };

    const handleExchanges = () => {
        router.push('/page/MyExchanges')
    }

    const selectMenuItem = (index) => {
        let newArr = [...initialStyle];
        newArr[index] = true;
        setStyle(newArr);
    };

    const setSelectedText = (txt) => {
        setText(txt);
        setDropDown(true);
    };

     const menuItems = [
        { text: 'Home', path: '/page/Home' },
        { text: 'Pricing', path: '/page/Pricing_Page' },
        { text: 'Learn', path: '/page/Learn_Page' },
        { text: 'Company', path: '/page/Company_Page' },
    ];

    
    const handleMenuItemClick = (index, path) => {
        setSelected(index);
        setIsDropdownOpen(false); 
        router.push(path); 
    };

    
    const isActiveMenuItem = (path) => {
        return router.pathname === path;
    };

    return (
        <div className="2xl:container 2xl:mx-auto fixed top-0 left-0 w-full z-50" style={{ backgroundColor: '#040429' }}>
            <div className="bg-gray-900 bg-opacity-50 shadow-lg py-5 px-7 shadow-blue">
                <nav className="flex justify-between">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <img src='/Assets/cryptobotLogo.png' alt='Cryptobot Logo' width={110} height={95} />
                    </div>
                    <ul className="hidden md:flex flex-auto space-x-2 pl-48 pt-2">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleMenuItemClick(index, item.path)}
                                className={`${isActiveMenuItem(item.path) ? 'text-white' : 'text-gray-600'} cursor-pointer text-m leading-5 pl-4`}
                            >
                                {item.text}
                            </li>
                        ))}
                        <li
                            onClick={() => setSelected(4)}
                            className={`${selected === 4 ? 'text-white' : 'text-gray-600'} cursor-pointer text-m leading-5 pl-4 relative`}
                        >
                            Settings
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <Link href='/page/ExchangeSelect'>
                                        <li className="cursor-pointer text-sm leading-5 text-gray-600 hover:bg-gray-100 pl-4 py-2">
                                            Exchange
                                        </li>
                                    </Link>
                                    <Link href='/page/ApiConfiguration'>
                                        <li className="cursor-pointer text-sm leading-5 text-gray-600 hover:bg-gray-100 pl-4 py-2">
                                            API Configuration
                                        </li>
                                    </Link>
                                    <Link href='/page/BotCreation'>
                                        <li className="cursor-pointer text-sm leading-5 text-gray-600 hover:bg-gray-100 pl-4 py-2">
                                            Create Bot
                                        </li>
                                    </Link>
                                    <Link href='/page/StrategySelection'>
                                        <li className="cursor-pointer text-sm leading-5 text-gray-600 hover:bg-gray-100 pl-4 py-2">
                                            Strategy
                                        </li>
                                    </Link>
                                    <Link href='/page/CryptoPairs'>
                                        <li className="cursor-pointer text-sm leading-5 text-gray-600 hover:bg-gray-100 pl-4 py-2">
                                            CryptoPair
                                        </li>
                                    </Link>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <div className="flex space-x-5 justify-center items-center pl-2">
                        <div className="relative cursor-pointer">
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="animate-ping w-1.5 h-1.5 bg-white rounded-full absolute -top-1 -right-1 m-auto duration-200" />
                            <div className="w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg" />
                        </div>
                        <svg className="cursor-pointer" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="relative inline-block text-left">
                            <div className="h-8 w-8 mb-4 lg:mb-0 mr-2 cursor-pointer">
                                <FaCircleUser className="h-full w-full" style={{ color: '#043bbc' }} onClick={() => setDropDown(!dropDown)} />
                            </div>
                            {dropDown && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button onClick={() => handleMenuItemClick(5, '/Profile/ProfileDashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Profile</button>
                                        <button onClick={() => handleMenuItemClick(6, '/page/Mybots')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">My Bots</button>
                                        <button onClick={() => handleMenuItemClick(7, '/page/MyExchanges')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">My Exchanges</button>
                                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Logout</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                <div className="block md:hidden w-full mt-5">
                    <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full">
                        <div className="flex space-x-2">
                            <span id="s1" className={`${text.length !== 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}>Selected: </span><p id="textClicked" className="font-normal text-sm leading-3">{text ? text : "Headers"}</p>
                        </div>
                        <svg id="ArrowSVG" className={`${dropDown ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="relative">
                        <ul id="list" className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md`}>
                            {menuItems.map((item, index) => (
                                <li key={index} onClick={() => setSelectedText(item.text)} className={`px-4 py-3 ${isActiveMenuItem(item.path) ? 'text-white bg-gray-600' : 'text-gray-600 bg-gray-50 hover:bg-gray-100'} border border-gray-50 duration-100 cursor-pointer text-xs leading-3`}>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

   

export default Header;

