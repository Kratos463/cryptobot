import React, { useState } from 'react';
import Link from 'next/link';


function Details() {
    const [sidebar, setsidebar] = useState();
    return (


        <div className=" fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className="flex flex-col items-center justify-center">

                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-4 mb-12">
                    <div className="flex flex-col items-center justify-center mb-6 ">
                        <img
                            src='/Assets/cryptobotLogo.png'
                            alt='Cryptobot Logo'
                            width={230}
                            height={170}
                        />
                    </div>

                    <div>
                        <lable className="text-xs font-sans leading-none text-white mt-2" >Date Of Birth</lable>
                        <input
                            aria-label="Enter your date of birth"
                            role="input"
                            type="date"
                            className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 "
                            style={{ backgroundColor: '#040414',border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}
                        />
                    </div>
                    <div>
                        <lable className="text-xs font-sans leading-none text-white">Phone</lable>
                        <div className="relative">
                            <input aria-label="enter phone number" role="input" type="text" className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 pr-16" style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }} />

                        </div>                    </div>
                    <div >
                        <lable className="text-xs font-sans leading-none text-white">Country</lable>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter country" role="input" type="text" className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 " style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>
                    <div >
                        <lable className="text-xs font-sans leading-none text-white">State</lable>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter state" role="input" type="text" className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 " style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>
                    <div >
                        <lable className="text-xs font-sans leading-none text-white">Zipcode</lable>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter Zipcode" role="input" type="text" className="bg-gray-800  rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 " style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">

                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href="/Registration/Documents_upload">
                        <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700  rounded hover:bg-indigo-600 py-4 w-full" style={{ backgroundColor: '#0086c9',border: '1px solid #043bbc' }}>
                            NEXT
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Details

