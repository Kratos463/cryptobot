const axios = require('axios');
const crypto = require('crypto');

const testCoinDCXApiConnection = async (apiKey, apiSecret) => {
    console.log("its reached in coindcx")
  const timestamp = Date.now();
  const payload = { timestamp };
  const payloadJSON = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(payloadJSON)
    .digest('hex');

  const headers = {
    'Content-Type': 'application/json',
    'X-AUTH-APIKEY': apiKey,
    'X-AUTH-SIGNATURE': signature,
  };

  try {
    const response = await axios.post(`${process.env.COINDCX_API_BASE_URL}/exchange/v1/users/info`, payload, { headers });
    console.log(response)
    if (response.status === 200) {
      return { success: true, message: 'Valid API key and secret' };
    } else {
      return { success: false, message: 'Failed to validate API key and secret' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}


module.exports ={
    testCoinDCXApiConnection

}