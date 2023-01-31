var express = require('express');
const checkAdmin = require('../middlewares/checkAdmin');
const checkAuth = require('../middlewares/checkAuth');
const Partner = require('../models/partner.model');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id', checkAuth, async function(req, res, next) {
    try{
        const partnerId = req.params.id;
        const partner = await Partner.findById(partnerId);

        if(!partner){
            throw new Error("Partner not found");
        }

        res.status(200).json({
            status: 200,
            partner: partner,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

router.get('/micro-loan', checkAuth, async () => {
    try{
        const partners = await Partner.find({type: "MicroLoan"});

        if(!partners){
            throw new Error("Micro Loan Partners not found");
        }

        res.status(200).json({
            status: 200,
            partners: partners,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

router.get('/pay-later', checkAuth, async () => {
    try{
        const partners = await Partner.find({type: "payLater"});

        if(!partners){
            throw new Error("Pay Later Partners not found");
        }

        res.status(200).json({
            status: 200,
            partners: partners,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

router.get('/personal-loan', checkAuth, async () => {
    try{
        const partners = await Partner.find({type: "personalLoan"});

        if(!partners){
            throw new Error("Personal Loan Partners not found");
        }

        res.status(200).json({
            status: 200,
            partners: partners,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

router.get('/credit-card', checkAuth, async () => {
    try{
        const partners = await Partner.find({type: "creditCard"});

        if(!partners){
            throw new Error("Credit Card Partners not found");
        }

        res.status(200).json({
            status: 200,
            partners: partners,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

router.post('/', checkAuth, checkAdmin, async function(req, res, next) {
    try{
        const partner = new Partner(req.body);
        await partner.save();

        res.status(200).json({
            status: 200,
            partner: partner,
        });
    }
    catch(err){
        next({status: 404, message: err.message});
    }
});

module.exports = router;