const asyncHandler = require('express-async-handler');
const Exchange = require('../../model/exchangeModel');
const upload = require('../../Middleware/image_upload');
const path = require('path');


// -------- Creating Exchanges -------------

const createExchange = asyncHandler(async (req, res) => {
    await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    try {
        const { exchangeName, description, status } = req.body;
        let imageUrl = null;

        const existExchangeName = await Exchange.findOne({exchangeName})

        if (existExchangeName){
            return res.status(400).json({error:'Exchagne already exists...'})
        }

        if (req.file) {
            imageUrl = path.join('/Assets', req.file.filename);
        }

        const newExchange = new Exchange({
            exchangeName,
            description,
            status,
            imageUrl
        });

        const savedExchange = await newExchange.save();
        res.status(201).json(savedExchange);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save exchange.' });
    }
});
// -------- Get Exchanges ------------

const getExchange = asyncHandler(async(req,res)=>{
    try{
        const exchangeList = await Exchange.find();
        res.status(200).json({exchangeList})

    }catch(error){
        console.error('Error in fetching exchanges');
        res.status(500).json({message:'Error in fetching exchanges..'})
    }
})

module.exports = { createExchange,getExchange };
