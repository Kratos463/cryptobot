import React, { useState, useEffect } from 'react';
import { MdVerified } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [verificationSent, setVerificationSent] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //---------------- function to validate password-----------

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
        } else {
            setPasswordError('');
        }
    };

    // -----------funtion to verify email-----------------

    const handleVerifyEmail = async () => {
        try {
            const response = await fetch('http://localhost:8001/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            });

            if (response.ok) {
                setVerificationSent(true);
                toast.success('Verification email sent. Please check your inbox.');
            } else {
                toast.error('Failed to send verification email. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            // alert('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (user.email) {
                try {
                    const response = await fetch('http://localhost:8001/check-email-verification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }),
                    });

                    const data = await response.json();

                    if (data.verified) {
                        setEmailVerified(true);
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error('Error checking email verification:', error);
                }
            }
        }, 5000);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [user.email]);

    const handleSubmit = async (event) => {
        console.log("button submit")
        event.preventDefault();
        if (!emailVerified) {
            toast.error('Please verify your email before registering.');
            return;
        }

        if (user.password !== user.confirmPassword) {
            toast.error('Password and confirm password do not match.');
            return;
        }

        if (passwordError) {
            toast.error('Please fix the password issues before submitting.');
            return;
        }

        if (!user.agreeTerms) {
            toast.error('Please agree to the terms and conditions.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                toast.success('Registration successful!');
            } else {
                toast.error('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[35%] md:w-[40%] w-full p-10 mt-4 mb-12">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <img src='/Assets/cryptobotLogo.png' alt='Cryptobot Logo' width={230} height={170} />
                    </div>

                    <p tabIndex={0} role="heading" aria-label="Login to your" className="text-xl font-extrabold leading-6 text-white text-center">Sign Up</p>
                    <p className="text-sm mt-4 font-medium leading-none text-gray-500 text-center mb-2">
                        Already have an account? <span className="text-blue-500 cursor-pointer">Login</span>
                    </p>


                        <div>
                            <label className="text-sm font-sans leading-none text-white mt-2">Full Name</label>
                            <input
                                aria-label="enter full name"
                                role="input"
                                type="text"
                                name='fullname'
                                value={user.fullname}
                                onChange={handleChange}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2" style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }} />
                        </div>
                        <div>
                            <label className="text-sm font-sans leading-none text-white">Email</label>
                            <div className="relative">
                                <input
                                    aria-label="enter email address"
                                    role="input" type="email"
                                    name='email' value={user.email}
                                    onChange={handleChange}
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 pr-16 mb-2" style={{ backgroundColor: '#040414', border: '1px solid #043bbc', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }} />
                                <button
                                    onClick={handleVerifyEmail}
                                    className="absolute right-0 bg-blue-500 text-white text-xs font-regular py-3 px-4 rounded"
                                    style={{
                                        backgroundColor: '#0086c9',
                                        border: '1px solid #043bbc'
                                    }}>Verify</button>
                            </div>
                        </div>

                        {verificationSent && !emailVerified && (
                        <div className="text-xs font-medium leading-none text-green-500 mt-2">
                            Verification email sent. Please check your inbox.
                        </div>
                    )}
                    {emailVerified && (
                        <div className="text-xs font-medium leading-none text-green-500 flex items-center">
                        Email verified <MdVerified className="ml-1" />
                    </div>
                    
                    )}


                        <div>
                            <label className="text-sm font-sans leading-none text-white">Password</label>
                            <div className="relative flex items-center justify-center">
                                <input aria-label="enter Password"
                                    role="input"
                                    type="password"
                                    name='password'
                                    value={user.password}
                                    onChange={(e) => { handleChange(e); validatePassword(e.target.value); }}
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2" style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer"></div>
                            </div>
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-sans leading-none text-white">Confirm Password</label>
                            <div className="relative flex items-center justify-center">
                                <input
                                    aria-label="enter Password"
                                    role="input"
                                    type="password"
                                    name='confirmPassword'
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3" style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }} />
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer"></div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <input id="terms"
                                type="checkbox"
                                name='agreeTerms'
                                checked={user.agreeTerms}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                            <label htmlFor="terms" className="ml-2 block text-sm leading-5 text-white">
                                Agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                            </label>
                        </div>
                        <div className="mt-2">
                            <button
                                onClick={handleSubmit}
                                role="button"
                                type='submit'
                                aria-label="create my account"
                                className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 rounded hover:bg-indigo-600 py-4 w-full" style={{ backgroundColor: '#0086c9', border: '1px solid #043bbc' }}>Create my account
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Register;