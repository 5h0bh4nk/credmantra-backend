const express = require('express');
const router = express.Router();
const Customer = require("../models/customer.model");

// create appication
router.post("/create", async (req, res, next) => {
    try{
        const application = await Customer.create(req.body);
        res.status(200).json({
            status: 200,
            application: application,
        });
    }
    catch(err){
        console.log(err);
        next({status: 404, message: err.message});
    }
});


module.exports = router;