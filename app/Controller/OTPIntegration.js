const twilio = require("twilio");
const crypto=require("crypto");

const OTPIntegration = {
    sendAndVerifyOTP: function (req, res) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = new twilio(accountSid, authToken);
        
        
        const {recipient,textmessage} = req.query;
        console.log(recipient);
        console.log(textmessage);
        const otp = Math.floor(100000+Math.random()*900000);    //generate otp
        const ttl=2*60*1000;        //expiry time
        let expires = Date.now();
        expires+=ttl;
        const data = `${recipient}.${otp}.${expires}`;
        const hash=crypto.createHmac('sha256',process.env.SMS_SECRET_KEY).update(data).digest('hex');
        const fullHash = `${hash}.${expires}`;

        try {
            client.messages.create({
                body: `Your OTP is ${otp}`,
                to: "+91"+recipient,
                from: '+14159804869'
            }).then((message) => console.log(message.sid));
            // .catch(error => console.error(error));

            res.status(200).send({ status: true, recipient,hash:fullHash,otp, message: "OTP sent successfully" });
        } catch (error) {
            res.status(500).send({ status: false, error:error+" is" });
        }
    }
};

module.exports = OTPIntegration;