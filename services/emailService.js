var nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmail = async (user,recipientEmail) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EmailAddress,
            pass: process.env.EmailPassword
        }
    });

    //create html from user object
    let html = "<div><h1>New User:</h1>";
    Object.keys(user).forEach((key) => {
        let value = user[key]
        html+='<div>'
        html+='<b>' + key + ': </b>' + value + '</br>'
        html += "</div>"
    })
    html += "</div>";
    var mailOptions = {
        from: process.env.EmailAddress,
        to: recipientEmail,
        subject: 'New user details from ex service',
        html: html
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
    });
}

module.exports = {
    sendEmail
}