const { model, Schema } = require("mongoose");

const partnerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["MicroLoan", "PayLater"],
            required: true,
        },
        apiLink: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
);

module.exports = model("Partner", partnerSchema);