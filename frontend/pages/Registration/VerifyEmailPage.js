import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MdVerified } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';

const EmailVerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(true); 

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:8001/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus(data.message);
          setIsSuccess(true); 
        } else {
          throw new Error(data.message || 'Error verifying email');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationStatus('Error verifying email. Please try again later.');
        setIsSuccess(false);  
      }
    };

    fetchVerificationStatus();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover' }}>
      <Head>
        <title>Email Verification</title>
        <meta name="description" content="Verify your email address" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-8 rounded shadow-md max-w-md w-full" style={{ backgroundColor: '#040408'}}>
        <div className="flex flex-col items-center mb-4">
          <img src="/Assets/cryptobotLogo.png" alt="Cryptobot Logo" width={100} height={100} />
        </div>

        <div
          className={`flex items-center justify-center p-4 mb-4 border-l-4 ${isSuccess ? 'bg-green-200 text-green-700 border-green-700' : 'bg-red-200 text-red-700 border-red-700'}`}
        >
          {isSuccess ? <MdVerified className="mr-2 text-2xl" /> : <AiFillCloseCircle className="mr-2 text-2xl" />}
          <div dangerouslySetInnerHTML={{ __html: verificationStatus }} />
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyPage;
