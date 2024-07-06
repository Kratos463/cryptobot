const asyncHandler = require('express-async-handler');
const Plan = require('../../model/planModel'); 

const add_Plan = asyncHandler(async (req, res) => {


    const { planName, price, duration, description, features } = req.body;
       if (!planName || !price || !duration || !description || !features) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const plan = new Plan({
        planName,
        price,
        duration,
        description,
        features
    });

    const createdPlan = await plan.save();
    res.status(201).json(createdPlan);
});

module.exports = { add_Plan };
