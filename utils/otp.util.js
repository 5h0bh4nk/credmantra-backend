const {TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_PHONE} = require("../config");
const {SERVER_ERR} = require("../errors");

exports.generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.fast2sms = async ({ message, contactNumber }, next, res) => {
    const accounSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accounSid, authToken);

    await client.messages
    .create({
      body: message,
      from: TWILIO_PHONE,
      to: contactNumber,
    })
    .then((message) => {console.log(message.sid); return message.sid;}, 
      (error) => next({status: 500, message: SERVER_ERR}));
};