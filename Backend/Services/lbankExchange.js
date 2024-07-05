const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const HmacSHA256_Sign = (preparedStr, secretKey) => {
    const sha256_HMAC = crypto.createHmac('sha256', secretKey);
    const hash = sha256_HMAC.update(preparedStr).digest('hex');
    return hash;
};

const generateEchostr = () => {
    return uuidv4().replace(/-/g, '').substring(0, 30); // Generating a 30 character string
};

const testLBankApiConnection = async (apiKey, apiSecret) => {
    try {
        const timestamp = Date.now().toString();
        const echostr = generateEchostr();
        const signatureMethod = 'HmacSHA256';

        const params = {
            api_key: apiKey,
            timestamp: timestamp,
            echostr: echostr,
            signature_method: signatureMethod,
        };

        const paramString = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');

        // MD5 digest
        const preparedStr = crypto.createHash('md5').update(paramString).digest('hex').toUpperCase();

        // Generate the signature
        const sign = HmacSHA256_Sign(preparedStr, apiSecret);

        params.sign = sign;

        const data = new URLSearchParams(params).toString();
       

        const config = {
            method: 'post',
            url: `${process.env.LBANK_API_BASE_URL}/v2/supplement/api_Restrictions.do`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        console.log('Generated Signature:', sign);
        console.log('Axios Config:', config);

        const response = await axios(config);

        if (!response.data) {
            console.error('Empty response from LBank API');
            return { success: false, message: 'Empty response from LBank API' };
        }

        console.log('LBank API Response:', response.data);

        // Return success only if the result is true
        if (response.data.result === 'true') {
            return { success: true, message: 'API connection to LBank successful', data: response.data };
        } else {
            return { success: false, message: response.data.msg || 'API connection to LBank failed', data: response.data };
        }
    } catch (error) {
        console.error('Error testing LBank API connection:', error.message);
        return { success: false, message: 'Failed to connect to LBank API', error: error.message };
    }

};

module.exports = { testLBankApiConnection };
