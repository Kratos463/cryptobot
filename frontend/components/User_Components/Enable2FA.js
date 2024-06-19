import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { FaCopy } from 'react-icons/fa';
import speakeasy from 'speakeasy'; 

function Enable2FA() {
    const [code, setCode] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [secretKey, setSecretKey] = useState('');

    const generateSecretKey = () => {
        const secret = speakeasy.generateSecret({ length: 20 });
        setSecretKey(secret.base32);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(secretKey);
        alert('Secret key copied to clipboard!');
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleEnable2FA = (secretKey, code) => {
        // Verify the code entered by the user against the secret key
        const verified = speakeasy.totp.verify({
            secret: secretKey,
            encoding: 'base32',
            token: code,
            window: 2, // Allowable margin in seconds
        });
    
        if (verified) {
            // Handle enabling 2FA logic here (e.g., update user's 2FA status in the database)
            setShowSuccess(true); // Set state to indicate success
            console.log('2FA enabled successfully!');
        } else {
            // Handle case where verification fails (e.g., show error message to the user)
            console.error('Invalid verification code. Please try again.');
        }
    };

   
    useEffect(() => {
        generateSecretKey();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center shadow rounded-lg lg:w-[%] md:w-[85%] w-full p-8 mt-2 mb-6" style={{ backgroundColor: '#04043c' }}>
                <h2 className="text-xl font-bold text-center mb-4 text-white">Enable 2-Factor Authentication</h2>

                <div className="font-[sans-serif] mb-6 flex justify-between flex-wrap w-full" style={{ color: '#dfe8f5' }}>
                    <div className="w-full md:w-[70%] mb-4 pr-2">
                        <p className="mb-4 text-xm">1. You will need an authenticator app to complete this process:</p>
                        <ul className="list-disc pl-8 text-sm" style={{ color: '#90a4b0' }}>
                            <li>Download and install an authenticator app such as Google Authenticator or Authy.</li>
                            <li>Open the authenticator app and proceed to scan the QR code on this page.</li>
                            <li>If you cannot scan the QR code, enter the secret key manually into your authenticator app.</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-[30%] mb-4 pl-4 flex items-center justify-center">
                        <div className="relative w-26 h-26">
                            <QRCode value={`otpauth://totp/YourAppName?secret=${secretKey}&issuer=YourAppName`} size={140} />
                        </div>
                    </div>
                </div>

                <div className="w-full mb-4 flex items-center bg-white rounded-md px-4 py-2">
                    <p className="text-sm font-semibold mr-2">{secretKey}</p>
                    <FaCopy onClick={copyToClipboard} className="text-gray-700 cursor-pointer" />
                </div>

                <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Enter 2FA code"
                    className="text-sm font-semibold leading-none text-gray-700 bg-white rounded px-4 py-2 w-full mb-4 focus:outline-none"
                />

                <div
                    role="button"
                    aria-label="Proceed to the next step"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-3 w-full text-center"
                    style={{ backgroundColor: '#0086c9', border: '1px solid #000030', cursor: 'pointer' }}
                    onClick={handleEnable2FA}
                >
                    NEXT
                </div>

                {showSuccess && (
                    <div className="mt-4 text-green-500 text-center">
                        2-Factor Authentication has been enabled successfully!
                    </div>
                )}
            </div>
        </>
    );
}

export default Enable2FA;
