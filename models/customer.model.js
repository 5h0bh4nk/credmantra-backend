const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male","female","preferNotSay"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    loan_amount: {
        type: String,
        required: true
    },
    employment_type: {
        type: String,
    },
    income: {
        type: String,
    },
    pincode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    residence: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    service: {
        type: String,
        enum: ["personal_loan","credit_card"],
        required: true
    }
});


module.exports = model("Customer", CustomerSchema);