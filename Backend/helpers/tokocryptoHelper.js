const axios = require('axios');
const crypto = require('crypto');

const placeTokocryptoOrder = async (apiKey, apiSecret, orderPayload) => {
    const apiUrl = 'https://www.tokocrypto.com/api/v1/orders'
    try {
        const payload = JSON.stringify(orderPayload);
        const signature = await calculateHmacSha256(apiSecret, payload);

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
                'X-SIGNATURE': signature,
            }
        });
        if (!response.data) {
            console.error('Empty response from Tokocrypto exchange');
            return { success: false, message: 'Empty response from Tokoscrypto API' };
        }

        if (response.data.message === 'success') {
            return { success: true, message: 'Order placed successfully on Tokocrypto', data: response.data };
        } else {
            return { success: false, message: response.data.msg || 'Failed to place order on Tokocrypto ', data: response.data };
        }

        
    } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function calculateHmacSha256(secret, data) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    return hmac.digest('hex');
}

module.exports = {
    placeTokocryptoOrder
}
