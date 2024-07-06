import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                localStorage.setItem('token', data.token);
                const isAdmin = data.isAdmin;
                

                if (isAdmin) {
                    
                    window.location.href = '/Admin/dashboard';
                } else {
                 
                    window.location.href = '/user/dashboard';
                }

                toast.success('Login successful!');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#fff',  backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-12 mb-12">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <img src="/Assets/cryptobotLogo.png" alt="Cryptobot Logo" width={230} height={170} />
                    </div>

                    <p tabIndex={0} role="heading" aria-label="Login to your" className="text-xl font-extrabold leading-2 text-blue text-center mt-8"> Admin Login</p>

                    <div>
                        <label className="text-sm font-sans leading-none text-white">Email</label>
                        <div className="relative">
                            <input
                                aria-label="enter email address"
                                role="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 pr-16 mb-2"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc', }}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-sm font-sans leading-none text-white">Password</label>
                        <div className="relative flex items-center">
                            <input
                                aria-label="enter Password"
                                role="input"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc', }}
                            />
                            <div
                                className="absolute right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <MdVisibilityOff color="white" /> : <MdVisibility color="white" />}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={handleSubmit}
                            role="button"
                            aria-label="login to my account"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full"
                            style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
