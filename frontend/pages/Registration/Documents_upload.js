import React, { useState } from 'react';
import { IoIosLink } from "react-icons/io";
import Link from 'next/link';


function DocumentsUpload() {
    const [sidebar, setSidebar] = useState();
    return (
        <div
            className="fixed w-full h-full items-center"
            style={{
                backgroundColor: '#040408',
                backgroundImage: 'url("/Assets/loginimage.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-4 mb-12">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <img
                            src='/Assets/cryptobotLogo.png'
                            alt='Cryptobot Logo'
                            width={230}
                            height={170}
                        />
                    </div>

                    <div className="w-full pt-4">
                        <label htmlFor="uploadFile1" className="block text-white text-xs font-sans pt-4 ">Upload Front of ID Proof:</label>
                        <div className="bg-white text-[#333] flex items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-1 min-w-[300px] w-full font-[sans-serif] rounded-md overflow-hidden mb-2 mx-auto" style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}>
                            <div className="px-4 flex items-center w-full">
                                <IoIosLink color='blue' />
                                <p className="text-sm ml-3">Document.pdf</p>
                            </div>
                            <label htmlFor="uploadFile1" className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-2.5 outline-none rounded-md cursor-pointer ml-auto w-max block" style={{ backgroundColor: '#0086c9' }}>Upload</label>
                            <input type="file" id="uploadFile1" className="hidden" />
                        </div>

                        <label htmlFor="uploadFile2" className="block text-white text-xs font-sans pt-4 ">Upload Back of ID Proof:</label>
                        <div className="bg-white text-[#333] flex items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-1 min-w-[300px] w-full font-[sans-serif] rounded-md overflow-hidden mb-2 mx-auto" style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}>
                            <div className="px-4 flex items-center w-full">
                                <IoIosLink color='blue' />
                                <p className="text-sm ml-3">Document.pdf</p>
                            </div>
                            <label htmlFor="uploadFile2" className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2.5 outline-none rounded-md cursor-pointer ml-auto w-max block" style={{ backgroundColor: '#0086c9' }}>Upload</label>
                            <input type="file" id="uploadFile2" className="hidden" />
                        </div>

                        <label htmlFor="uploadFile3" className="block text-white text-xs font-sans pt-4 ">Upload recent Utility Bill/Bank Statement:</label>
                        <div className="bg-white text-[#333] flex items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-1 min-w-[300px] w-full font-[sans-serif] rounded-md overflow-hidden  mx-auto" style={{ backgroundColor: '#040414',border: '1px solid #043bbc' }}>
                            <div className="px-4 flex items-center w-full">
                                <IoIosLink color='blue' />
                                <p className="text-sm ml-3">Document.pdf</p>
                            </div>
                            <label htmlFor="uploadFile3" className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-2.5 outline-none rounded-md cursor-pointer ml-auto w-max block" style={{ backgroundColor: '#0086c9' }}>Upload</label>
                            <input type="file" id="uploadFile3" className="hidden" />
                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <Link href="/Registration/SelfieVerification">
                        <button
                            role="button"
                            aria-label="create my account"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                            style={{ backgroundColor: '#0086c9', border: '1px solid #000030' }}
                        >
                            NEXT
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentsUpload;
