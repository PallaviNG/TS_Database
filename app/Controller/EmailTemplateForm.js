const EmailTemplateForm = {
    templateDynamicData: function (student_name, batch_name, interviewer_name, feedbackForm) {
        let data= `
        <h4>Hello <strong> ${student_name}, </strong></h4>
        <p>Thank you for joining Testing Shastra! </p>
        <p>Please find feedback details of your mock interview:</p>
        <ul>Details:
        <li>Conducted by: ${interviewer_name}</li>
        <li>Batch: ${batch_name} </li>
        <li>Attended For: ${feedbackForm.template_title}</li></ul>
        <p style="margin-top:15px;">Thanks & Regards</p>
        <b>Testing Shastra|HR</b>
        <p><b>MNo.</b>+91-9130502135</p>
        <p><b>Email:</b>info@testingshastra.com</p>
        `;
        feedbackForm.questionSets.forEach(element => {
            data+=`<ul><li>${element.question}</li>
            <li>${element.answer}</li></ul>`;
        });

        console.log(data);

        return data;
    }

};

module.exports = EmailTemplateForm;