import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function GetWebhookurl() {
    const router = useRouter();
    const {shortId } = router.query;
    const [webhookUrl, setWebhookUrl] = useState('');

    useEffect(() => {
        if (shortId) {
            const url = `https://cryptobot.com/webhook/${shortId}`;
            setWebhookUrl(url);
        }
    }, [shortId]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            toast.success('Webhook URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed w-full h-full items-center" style={{ backgroundColor: '#040408', backgroundImage: 'url("/Assets/loginimage.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col items-center justify-center">
                <div className="shadow rounded lg:w-[58%] md:w-[40%] w-full p-10 mt-4 mb-12 text-white">
                    <p className="text-center text-2xl font-semibold mb-4 mt-16">Webhook URL</p>
                    <div className="flex items-center justify-between bg-gray-800 rounded px-4 py-2 mb-4 mt-8">
                        <span className="text-white text-sm break-all">{webhookUrl}</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={copyToClipboard}>
                            Copy
                        </button>
                    </div>

                    <div className="mt-">
                        <p className="text-center text-lg font-semibold mb-4">TradingView Alert Setup</p>
                        <p className="text-sm text-gray-400 mb-2">To use this webhook URL with TradingView, follow these instructions:</p>
                        <ol className="list-decimal list-inside text-sm text-gray-400 mb-4">
                            <li>Go to TradingView and set up an alert.</li>
                            <li>In the alert settings, choose "Webhook URL" and paste the copied URL.</li>
                            <li>Set the alert message in JSON format as shown below:</li>
                        </ol>
                        <div className="bg-gray-800 rounded p-4 mb-4">
                            <pre className="text-sm text-white">
                                {`{
    "symbol": "BTCUSDT",
    "side": "buy",
    "quantity": "0.01",
    "price": "30000",
    "orderType": "limit"
}`}
                            </pre>
                        </div>
                        {/* <p className="text-sm text-gray-400">**Parameters**:</p>
                        <ul className="list-disc list-inside text-sm text-gray-400">
                            <li><strong>symbol</strong>: Trading pair symbol (e.g., BTCUSDT)</li>
                            <li><strong>side</strong>: Order side (buy/sell)</li>
                            <li><strong>quantity</strong>: Order quantity</li>
                            <li><strong>price</strong>: Order price (optional for market orders)</li>
                            <li><strong>orderType</strong>: Type of order (market/limit)</li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetWebhookurl;
