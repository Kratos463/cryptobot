import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import Link from 'next/link';

function SelfieVerification() {
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };

    return (
        <div
            className="fixed w-full h-full flex flex-col items-center justify-center"
            style={{
                backgroundColor: '#040408',
                backgroundImage: 'url("/Assets/loginimage.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                paddingTop: '40px',
            }}
        >
            <div className="flex flex-col items-center mb-4">
                <img
                    src='/Assets/cryptobotLogo.png'
                    alt='Cryptobot Logo'
                    width={230}
                    height={170}
                />
            </div>

            <div className="flex flex-col items-center shadow rounded lg:w-[30%] md:w-[35%] w-full p-8 mt-2 mb-6" style={{ backgroundColor: '#000034' }}>
                <h2 className="text-2xl font-sans text-center mb-4 text-white">Selfie Verification</h2>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 rounded-full border-4 border-dashed  flex items-center justify-center" style={{ borderColor: '#008dcd' }}>
                        <input
                            type="file"
                            id="uploadSelfie"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center justify-center text-center">
                            <FaCamera className="" style={{ fontSize: '36px', color: '#008dcd' }} />
                            <p className="mt-2 text-sm text-gray-500">Take a Selfie or<br /> Upload</p>
                        </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">{fileName}</p>
                </div>

                <div className="text-white text-sm font-[sans-serif] mb-6 text-center">
                    <p className="mb-2">1. Make sure your face is clearly visible.</p>
                    <p className="mb-2">2. Ensure there is good lighting.</p>
                    <p className="">3. Remove any hats or sunglasses.</p>
                </div>
                <Link href="/Registration/Enable2FA">
                    <button
                        role="button"
                        aria-label="Proceed to the next step"
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-3 pr-28 pl-28 w-full"
                        style={{ backgroundColor: '#0086c9', border: '1px solid #000030' }}
                    >
                        NEXT
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SelfieVerification;
