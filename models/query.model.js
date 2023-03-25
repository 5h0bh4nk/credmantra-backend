const { model, Schema } = require("mongoose");

const QuerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
    }
});


module.exports = model("Query", QuerySchema);