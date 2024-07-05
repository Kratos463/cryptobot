const asyncHandler = require('express-async-handler');
const ExchangeConfig = require('../model/exchangeConfigModel')

const GetExchanges = asyncHandler(async () => {
    const userId = req.user.userId;
    try {

        const Exchanges = await ExchangeConfig.find({ userId })
        console.log(Exchanges)
    } catch (error) {
        console.log("error occured while is fetching in exchanges.")
    }

})


module.exports = {
    GetExchanges
}