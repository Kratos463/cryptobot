import React, { useState, useEffect } from 'react';
import { MdVerified } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRouter } from 'next/router';
import Link from 'next/link';



function Register() {

    const router = useRouter();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [verificationSent, setVerificationSent] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);





    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));


    };

    //---------------- function to validate password-----------

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push(' Password  8 characters long.');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('one lowercase letter.');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push(' one uppercase letter.');
        }
        if (!/[0-9]/.test(password)) {
            errors.push(' At least one number.');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push(' one special character.');
        }
        setPasswordError(errors);
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

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         if (user.email) {
    //             try {
    //                 const response = await fetch('http://localhost:8001/check-email-verification', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({ email: user.email }),
    //                 });

    //                 const data = await response.json();

    //                 if (data.verified) {
    //                     setEmailVerified(true);
    //                     clearInterval(interval);
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking email verification:', error);
    //             }
    //         }
    //     }, 5000);

    //     return () => clearInterval(interval); // Clean up interval on component unmount
    // }, [user.email]);

    // --------------validating confirm password-----------------

    const validateConfirmPassword = (confirmPassword) => {

        if (confirmPassword !== user.password) {
            console.log("no matach")
            setConfirmPasswordError('Password do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (event) => {
        console.log("button submit")
        event.preventDefault();
        // if (!emailVerified) {
        //     toast.error('Please verify your email before registering.');
        //     return;
        // }

        if (user.password !== user.confirmPassword) {
            toast.error('Password and confirm password do not match.');
            return;
        }
        if (passwordError.length > 0) {
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
                const data = await response.json();
                const { user } = data;
                router.push('/page/RegistrationSuccess')
                toast.success('Registration successful! verification email send');
                await handleVerifyEmail(user.email)

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
                        Already have an account? <Link href='/page/Login'><span className="text-blue-500 cursor-pointer">Login</span></Link>
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
                            {/* <button
                                    onClick={handleVerifyEmail}
                                    className="absolute right-0 bg-blue-500 text-white text-xs font-regular py-3 px-4 rounded"
                                    style={{
                                        backgroundColor: '#0086c9',
                                        border: '1px solid #043bbc'
                                    }}>Verify</button> */}
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-sm font-sans leading-none text-white">Password</label>
                        <div className="relative flex items-center">
                            <input
                                aria-label="enter Password"
                                role="input"
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={user.password}
                                onChange={(e) => {
                                    handleChange(e);
                                    validatePassword(e.target.value);
                                    setShowPopover(true);
                                }}
                                onBlur={() => setShowPopover(false)}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3 mb-2"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                            />
                            <div
                                className="absolute right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <MdVisibilityOff color='white' /> : <MdVisibility color='white' />}
                            </div>
                        </div>
                        {passwordError.length > 0 && showPopover && (
                            <div className="absolute bg-red-500 text-white text-xs p-4 w-48 rounded left-full ml-2 mt-1">
                                <ul>
                                    {passwordError.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-sans leading-none text-white">Confirm Password</label>
                        <div className="relative flex items-center">
                            <input
                                aria-label="enter Confirm Password"
                                role="input"
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={user.confirmPassword}
                                onChange={(e) => {
                                    handleChange(e);
                                    validateConfirmPassword(e.target.value);
                                }}
                                className="bg-gray-800 rounded focus:outline-none text-xs font-medium leading-none text-white py-3 w-full pl-3"
                                style={{ backgroundColor: '#040414', border: '1px solid #043bbc' }}
                            />
                            <div
                                className="absolute right-3 cursor-pointer"
                                onClick={() => setConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <MdVisibilityOff color='white' /> : <MdVisibility color='white' />}
                            </div>
                        </div>
                        {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}

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