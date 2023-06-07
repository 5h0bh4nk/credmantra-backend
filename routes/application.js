const express = require('express');
const router = express.Router();
const Application = require("../models/application.model");

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

router.get("/all", checkAuth, checkAdmin, async () =>{
    try{
        const applications = await Application.find();
        res.status(200).json({
            status: 200,
            applications: applications,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

// get all applications for a user
router.get("/:userId", checkAuth, async () => {
      try{
        const applications = await Application.find({userId: req.params.userId});
        res.status(200).json({
            status: 200,
            applications: applications,
        });
      }
      catch(err){
        next({status: 404, message: err.message});
      }
});

// create appication
router.post("/create", checkAuth, async () => {
    try{
        const application = await Application.create({
            user: req.user._id,
            partner: req.body.partner,
            status: APPLIED,
        });
        res.status(200).json({
            status: 200,
            application: application,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

module.exports = router