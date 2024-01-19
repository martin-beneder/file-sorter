

import nodemailer from "nodemailer";

async function sendEmail(recipient: string, subject: string, body: string, url: string) {
    // Configure the SMTP server settings
    let transporter = nodemailer.createTransport({
        host: "smtp.world4you.com", // Replace with your mail server host
        port: 587, // Common port for SMTP
        secure: false, // true for 465, false for other ports
        auth: {
            user: "business@digitalhorizon-solution.at", // Replace with your email
            pass: "9J36@$iB8#3UpJ*qc*wX5^", // Replace with your email password
        },
    });

    // Setup email data
    let mailOptions = {
        from: '"Sender Name" business@digitalhorizon-solution.at', // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        html: `<a href="${url}">Verify Email</a>`, // html body (optional)
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

export const sendEmailVerificationLink = async (token: string, to: string) => {
    const url = `http://localhost:3000/email-verification/${token}`;
    console.log(`Your email verification link: ${url}`);
    await sendEmail(
        to,
        "Verify Your Email",
        "Please verify your email address by clicking this link: ",
        url
    );
};

export const sendPasswordResetLink = async (token: string, to: string) => {
    const url = `http://localhost:3000/password-reset/${token}`;
    console.log(`Your password reset link: ${url}`);
    await sendEmail(
        to,
        "Verify Your Email",
        "Please verify your email address by clicking this link: ",
        url
    );
};

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
    if (typeof maybeEmail !== "string") return false;
    if (maybeEmail.length > 255) return false;
    const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
    return emailRegexp.test(maybeEmail);
};