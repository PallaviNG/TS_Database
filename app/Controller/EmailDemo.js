var nodemailer = require("nodemailer");
var EmailTemplateForm = require("./EmailTemplateForm");

const EmailDemo = {
    // Enable less secure apps to send email from GMail using SMTP
    // https://www.google.com/settings/security/lesssecureapps
    sendEmailToStudent: function (req, res) {
        var data = req.body;
        console.log(data);
        let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            auth: {
                user: "info@testingshastra.com",
                pass: "Password"
            }
        });
        let mailOptions = {
            from: data.email,//info@testingshastra.com
            to: data.student_email,
            subject: `Feedback from Testing Shastra conducted by ${data.interviewer_name}`,
            html: EmailTemplateForm.templateDynamicData(data.student_name, data.batch_name, data.interviewer_name, data.feedbackForm)
        };
        smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
                res.status(400).send({ status: false, error });
            }
            else {
                res.status(200).send({ status: true, response, message: 'Email Sent successfully...' });
            }
        });
        smtpTransport.close();
    }
};
module.exports = EmailDemo;