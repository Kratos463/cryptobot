const axios = require('axios');
const crypto = require('crypto');

const placeXT_COMorder = async (apiKey, apiSecret, orderPayload) => {
    console.log(apiKey)
    try {
        const timestamp = Date.now();
        const recvWindow = 5000; // Optional parameter
        const path = `/spot/v4/order`;
        
        // Constructing query string
        const queryString = `symbol=${orderPayload.symbol}&side=${orderPayload.side}&type=${orderPayload.type}&timeInForce=${orderPayload.timeInForce}&bizType=${orderPayload.bizType}&timestamp=${timestamp}&recvWindow=${recvWindow}`;
        const bodyString = `price=${orderPayload.price}&quantity=${orderPayload.quantity}`;

        const signaturePayload = `${path}#${queryString}#${bodyString}`;
        const signature = crypto.createHmac('sha256', apiSecret).update(signaturePayload).digest('hex');

        console.log("Timestamp:", timestamp);
        console.log("Query String:", queryString);
        console.log("Body String:", bodyString);
        console.log("Signature Payload:", signaturePayload);
        console.log("Signature:", signature);

        const config = {
            method: 'post',
            url: `${process.env.XT_COM_API_BASE_URL}${path}`,
            headers: {
                'validate-appkey': apiKey,
                'validate-timestamp': timestamp,
                'validate-signature': signature,
                'Content-Type': 'application/x-www-form-urlencoded',
                'validate-recvwindow': recvWindow,
            },
            data: {
                symbol: orderPayload.symbol,
                side: orderPayload.side,
                type: orderPayload.type,
                timeInForce: orderPayload.timeInForce,
                bizType: orderPayload.bizType,
                price: orderPayload.price,
                quantity: orderPayload.quantity,
            }
        };

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from XT.com API');
            return { success: false, message: 'Empty response from XT.com API' };
        }

        console.log('XT.com API Response:', response.data);
        return { success: true, message: 'Order submitted successfully', data: response.data };
    } catch (error) {
        console.error('Error submitting order to XT.com:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Failed to submit order to XT.com API', error: error.message };
    }
};

module.exports = { placeXT_COMorder };
