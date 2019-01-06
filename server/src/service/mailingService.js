const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'foryoutest01@gmail.com',
    pass: 'foryou01'
  }
});

const mailSender = async (mailOptions, next) => {
  try {
    const response = await smtpTransport.sendMail(mailOptions);
    return response;
  }catch(error){
    next({ customError: `Error Sending mail` });
  }
}

module.exports = {
    mailSender
}