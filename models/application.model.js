const { model, Schema } = require("mongoose");

const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "Partner",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
}, 
{ timestamps: true }
);

module.exports = model("Application", applicationSchema);