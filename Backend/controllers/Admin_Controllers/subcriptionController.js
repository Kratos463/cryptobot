const asyncHandler = require('express-async-handler');
const Plan = require('../../model/planModel');


// ---------- Adding new subcription plan ---------------

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



// --------- Get subcription plans ------------

const getPlans = asyncHandler(async (req, res) => {

    try {
        const plans = await Plan.find();
        res.status(200).json({ plans });
    } catch (error) {
        console.error('Error in fetching plans:', error);
        res.status(500).json({ message: 'Error in fetching plans' });
    }
})

// --------Delete the subcription plan by id--------------

const DeletePlan = asyncHandler(async (req, res) => {

    const { planId } = req.params;

    try {
        const deletedPlan = await Plan.findByIdAndDelete(planId);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.json({ message: 'Plan deleted successfully', deletedPlan });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ message: 'Failed to delete plan' });
    }

})

// -----------Fetching subcription details by ID---------------

const GetplanById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const planData = await Plan.findById(id);
        if (!planData) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json(planData);
    } catch (error) {
        console.log("error in fetching plan data by id ..", error);
        res.status(500).json({ message: "Server error" });
    }
})

// --------------Updating subcription plan ---------------

const update_Plan = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { planName,
        price,
        duration,
        features,
        description } = req.body;

    try {
        const plan = await Plan.findById(id);

        if (!plan) {
            return res.status(404).json({ message: 'plan not found' })
        }
        plan.planName = planName;
        plan.price = price;
        plan.duration = duration;
        plan.features = features;
        plan.description = description;

        const updatedPlan = await plan.save();
        res.status(200).json({
            message: 'Plan updated successfully.',
            plan: updatedPlan
        })

    } catch (error) {
        console.error('error updating plan', error);
        res.status(500).json({ message: 'failed to update plan' })
    }
})


module.exports = {
    add_Plan,
    getPlans,
    DeletePlan,
    GetplanById,
    update_Plan
};
