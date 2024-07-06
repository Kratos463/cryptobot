import React, { useState } from "react";
import Link from "next/link";

function Subcription() {
    const [show, setShow] = useState(null)
    const status = "active";
    return (
        <>
            <div className="w-70 sm:px-6 mt-4">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Subcriptions</p>
                        <div>
                            <Link href='/Admin/SubcriptionManagement/Addplan_Page'>
                                <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" style={{ backgroundColor: '#0086c9' }}>
                                    <p className="text-sm font-medium leading-none text-white" >Add Plan</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-semibold text-left pl-4">Plan Name</th>
                                <th className="font-semibold text-left pl-8">Price</th>
                                <th className="font-semibold text-left pl-8">Duration</th>
                                <th className="font-semibold text-left pl-12">Features</th>
                                <th className="font-semibold text-left pl-12">Status</th>
                                <th className="font-semibold text-left pl-12">Description</th>
                                <th className="font-semibold text-left pl-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            <tr className="h-20 text-sm leading-none text-gray-800 border-b border-t bg-white hover:bg-gray-100 border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="pl-2">
                                            <p className="font-medium">Starter</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-8">
                                    <p className="text-sm font-medium leading-none text-gray-800">$34</p>

                                </td>
                                <td className="pl-8">
                                    <p className="font-medium">
                                        Monthly
                                    </p>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium">5 Webhook URL</p>
                                    <p className="font-medium">Access to ltd pairs</p>

                                </td>
                                <td className="pl-12">
                                    {status === "active" ? (
                                        <div className="px-2 py-1 rounded-full bg-green-200 text-green-700">Active</div>
                                    ) : (
                                        <div className="px-2 py-1 rounded-full bg-red-200 text-red-700  ">Inactive</div>
                                    )}
                                </td>

                                <td className="pl-12">
                                    <div className="flex items-center">
                                        <p className="font-medium">Make your first steps with trading our bots</p>

                                    </div>
                                </td>
                                <td className="px-7 2xl:px-0">
                                    {
                                        show == 7 ? <button onClick={() => setShow(null)} className="focus:outline-none pl-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button> : <button onClick={() => setShow(7)} className="focus:outline-none pl-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }
                                    {show == 7 && <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                        >
                                            <p>Edit</p>
                                        </div>
                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                            <p>Delete</p>
                                        </div>
                                    </div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Subcription;
