const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'andreane.krajcik57@ethereal.email', // Enter your smtp server email change it 
        pass: 'uRR1UEz6bJABE5e3Nq' // Enter your smtp server password change it
    }
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: 'andreane.krajcik57@ethereal.email',  
    to: email,              
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP sent: ', info.response);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

module.exports = sendOTP;
