const { model, Schema } = require("mongoose");

const QuerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    occupation: {
        type: String
    },
    pan: {
        type: String,
        minlength: 10,
        maxLength: 10
    },
    pincode: {
        type: String,
        minlength: 6,
        maxLength: 6
    },
    income: {
        type: String
    },
    product: {
        type: String
    },
    dob: {
        type: String
    },
    itr: {
        type: String
    },
    gst: {
        type: String
    }
});


module.exports = model("Query", QuerySchema);