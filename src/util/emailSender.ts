import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'courseworkt810@gmail.com',
        pass: 'drmgqctqxnvlagvg'
    }
});

const sendEmail = (subject: string, template: any, email: string[]) => {
    const mailOptions = {
        from: 'courseworkt810@gmail.com',
        to: email.toString(),
        subject: subject,
        html: template,
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export default sendEmail;
