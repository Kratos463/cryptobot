import React from 'react';
import { useRouter } from 'next/router';
import { MdCheckCircle } from 'react-icons/md';

const RegistrationSuccess = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/page/Login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 " style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', color: 'white' }}>
            <MdCheckCircle size={100} className="text-green-500 mb-8" />
            <h1 className="text-4xl font-bold mb-4">Registered Successfully</h1>
            <p className="mb-4">Please verify your email before logging in.</p>
            <button 
                onClick={handleLogin} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
            >
                Login
            </button>
        </div>
    );
};

export default RegistrationSuccess;
