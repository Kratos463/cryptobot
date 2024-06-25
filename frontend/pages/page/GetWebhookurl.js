import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import shortid from 'shortid';


function GetWebhookurl() {
    const router = useRouter();
    const { userId, botId } = router.query;
    const [webhookUrl, setWebhookUrl] = useState('');

    useEffect(() => {
        if (userId && botId) {
            // const shortUrl = `https://cryptobot.com/webhook/${shortid.generate()}`;

            const url = `https://cryptobot.com/webhook/${userId}/${botId}`;
            setWebhookUrl(url);

        }
    }, [userId, botId]);

    // Copy URL to clipboard function
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            alert('Webhook URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };


    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[55%] md:w-[40%] w-full p-10 mt-4 mb-12 text-white">
                    <p className="text-center text-2xl font-semibold mb-4 mt-16">Webhook URL</p>
                    <div className="flex items-center justify-between bg-gray-800 rounded px-4 py-2 mb-4 mt-8">
                        <span className="text-white text-sm break-all ">{webhookUrl}</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={copyToClipboard}>
                            Copy
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-400">Click 'Copy' to copy the webhook URL.</p>
                </div>
            </div>
        </div>
    );
}

export default GetWebhookurl;
