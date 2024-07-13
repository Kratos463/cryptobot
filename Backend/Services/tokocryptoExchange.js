const axios = require('axios');
const crypto = require('crypto-js');



const testTokocryptoApiConnection = async (apiKey, apiSecret) => {

    const recvWindow = 5000;
    const timestamp = Date.now();
    const asset = 'BTC'

    const queryString = `asset=${asset}&recvWindow=${recvWindow}&timestamp=${timestamp}`;

    // Create the HMAC SHA256 signature
    const signature = crypto.HmacSHA256(queryString, apiSecret).toString(crypto.enc.Hex);

    try {
        const response = await axios.get(`https://www.tokocrypto.com/open/v1/account/spot/asset?${queryString}&signature=${signature}`, {
            headers: {
                'X-MBX-APIKEY': apiKey
            }
        });
        console.log(response.data.msg);
        if (response.data.msg === 'Success') {
            return { success: true, message: 'Api Connection to tokocrypto exchange is successfull', data: response.data }
        } else {
            return { success: false, message: 'Api connection to tokoxrypto is failed', data: response.data };
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


module.exports = {
    testTokocryptoApiConnection
}
