import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserEdit } from "react-icons/fa";
import { TbAuth2Fa, TbLogout2 } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const ProfileSidebar = () => {
    const router = useRouter();

    // Define a function to determine if a link matches the current route
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block top-16">
            <div className="sticky flex flex-col gap-2 p-2 text-sm border-r border-indigo-100">
                <h2 className="pl-3 mb-4 text-2xl font-semibold text-white mt-4">Settings</h2>
                <Link href="/Profile/ProfileDashboard">
                    <button
                        className={`flex items-center space-x-2 px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/ProfileDashboard') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                      <FaUserEdit/>  Edit Profile
                    </button>
                </Link>
                <Link href="/Profile/TwoFactorAuthentication">
                    <button
                        className={`flex items-center space-x-2 px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/TwoFactorAuthentication') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                        <TbAuth2Fa /> Two Factor Authentication
                    </button>
                </Link>
                <Link href="/Profile/ChangePassword">
                    <button
                        className={`flex items-center space-x-2 px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/ChangePassword') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                        <RiLockPasswordFill /> Change Password
                    </button>
                </Link>
                <Link href="/Profile/ChangeEmail">
                    <button
                        className={`flex items-center px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/ChangeEmail') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                        <MdEmail /> Change Email
                    </button>
                </Link>
                <Link href="/Profile/AccountSettings">
                    <button
                        className={`flex items-center px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/AccountSettings') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                        <IoSettings /> Account Settings
                    </button>
                </Link>
                <Link href="/Profile/Logout">
                    <button
                        className={`flex items-center px-3 py-2.5 font-sans hover:text-indigo-900 hover:border hover:rounded cursor-pointer ${isActive('/Profile/Logout') ? 'bg-white' : ''}`}
                        style={{ color: '#0198e2' }}
                    >
                        <TbLogout2 /> Logout
                    </button>
                </Link>
            </div>
        </aside>
    );
};

export default ProfileSidebar;
