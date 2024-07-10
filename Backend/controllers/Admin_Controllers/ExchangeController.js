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
        const { exchangeName, description, } = req.body;
        let imageUrl = null;


        const existExchangeName = await Exchange.findOne({ exchangeName })
        if (existExchangeName) {
            return res.status(400).json({ error: 'Exchagne already exists...' })
        }
        if (req.file) {
            imageUrl = path.join('/Assets', req.file.filename);
        }
        const newExchange = new Exchange({
            exchangeName,
            description,
            imageUrl
        });
        const savedExchange = await newExchange.save();

        res.status(201).json(savedExchange);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save exchange.' });
    }
});
// --------------Get Exchanges ------------

const getExchange = asyncHandler(async (req, res) => {
    try {
        const exchangeList = await Exchange.find();
        res.status(200).json({ exchangeList })

    } catch (error) {
        console.error('Error in fetching exchanges');
        res.status(500).json({ message: 'Error in fetching exchanges..' })
    }
})

// ----------- Deletion of Exchange ------------

const DeleteExchange = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExchange = await Exchange.findByIdAndDelete(id);
        if (!deletedExchange) {
            return res.status(404).json({ message: 'Exchange is not found' })
        }
        res.json({ message: 'Exchange deleted Successfully' })
    } catch (error) {
        console.error('error in deleting plan :', error);
        res.status(500).json({ message: 'failed to delete exchange' })
    }
})

// ----------  Get Exchange by id -----------------

const getExchangeById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const ExchangeData = await Exchange.findById(id);
        if (!Exchange) {
            res.status(200).json(ExchangeData)
        }
        res.status(200).json(ExchangeData)
    } catch (error) {
        console.error("error in fetching exchange data by id ..", error)
        res.status(500).json({ message: "error in fetching exchange data by id" })
    }
})

// ---------------- Edit Exchange ------------

const Edit_exchange = asyncHandler(async (req, res) => {

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
        const { exchangeName, description, exchangeId } = req.body;
        let imageUrl = null;
        const existingExchange = await Exchange.findById(exchangeId);
        if (!existingExchange) {
            return res.status(404).json({ error: 'Exchange not found.' });
        }
        if (req.file) {
            imageUrl = path.join('/Assets', req.file.filename);
        }
        existingExchange.exchangeName = exchangeName || existingExchange.exchangeName;
        existingExchange.description = description || existingExchange.description;
        if (imageUrl) {
            existingExchange.imageUrl = imageUrl;
        }
        const updatedExchange = await existingExchange.save();
        res.status(200).json(updatedExchange);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update exchange.' });
    }
});


// ---------- Update Exchange status --------

const updateExchangeStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const exchange = await Exchange.findById(id);
        if (!exchange) {
            return res.status(404).json({ success: false, message: 'Exchanage not found' })
        }
        exchange.status = status;
        await exchange.save();
        res.status(200).json({ success: true, data: exchange })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update the status" });

    }
})


module.exports =
{
    createExchange,
    getExchange,
    DeleteExchange,
    getExchangeById,
    Edit_exchange,
    updateExchangeStatus
};
