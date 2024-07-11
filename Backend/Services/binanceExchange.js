const Binance = require('binance-api-node').default
const asyncHandler = require('express-async-handler');


const testBinanceApiConnection = asyncHandler(async(apiKey, apiSecret)=>{
    console.log("test binance")
    try {
        const client = Binance({
          apiKey: apiKey,
          apiSecret: apiSecret,
        })
    
        const accountInfo = await client.accountInfo({ recvWindow: 5000 })
        console.log("account info",accountInfo)
        return { success: true, data: accountInfo }
      } catch (error) {
        return { success: false, message: error.message }
      }

})


module.exports ={
    testBinanceApiConnection
}