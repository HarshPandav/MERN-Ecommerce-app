const nodeMailer = require('nodemailer')

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOption = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOption);
    } catch (error) {
        console.log("Error While sendind Email: ",error);
    }
}

module.exports = sendEmail  