import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function Enable2FA() {
    const [code, setCode] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const generateSecretKey = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kyc/2fa_generate_secret`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { secret, qrImageDataUrl } = response.data;
            setSecretKey(secret);
            setQrCodeUrl(qrImageDataUrl);

        } catch (error) {
            console.error('Error generating secret key:', error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(secretKey);
        alert('Secret key copied to clipboard!');
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleEnable2FA = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kyc/2fa_verify`, {
                otp: code
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)

            if (response.data.success) {
                setShowSuccess(true);
                toast.success('2FA enabled successfully')
                console.log('2FA enabled successfully!');
            } else {
                toast.error('Invalid verification code. Please try again.')
                console.error('Invalid verification code. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying 2FA code:', error);
        }
    };

    useEffect(() => {
        generateSecretKey();
    }, []);

    return (
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
                    {qrCodeUrl && <img src={`data:image/svg+xml;base64,${btoa(qrCodeUrl)}`} alt="QR Code" />}
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
                SUBMIT
            </div>

            {showSuccess && (
                <div className="mt-4 text-green-500 text-center">
                    2-Factor Authentication has been enabled successfully!
                </div>
            )}
        </div>
    );
}

export default Enable2FA;
