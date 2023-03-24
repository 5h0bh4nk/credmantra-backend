const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
    },

    role :{
     type : String,
     enum:["ADMIN","USER"],
     default:"USER",
    },

    phoneOtp:{
        type:String,
        length:6,
    },

    phoneOtpExpire:{
        type:Date,
    },

    detailsFilled:{
        type:Boolean,
        default:false,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    google: {
      id: {
        type: String,
      },
      email: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
