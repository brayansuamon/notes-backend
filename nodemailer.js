const nodemailer = require('nodemailer');
const { config } = require('./config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.myEmail,
    pass: config.myPassword,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendingMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Brayan Suarez 👻" <brayansuamon@gmail.com>', // sender address
    to: 'micheal.fisher@ethereal.email, bralemon0119@gmail.com', // list of receivers
    subject: 'This is my first mail', // Subject line
    text: 'How are you?', // plain text body
    html: '<b>How are you?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendingMail().catch(console.error);

//Exec in terminal with node nodemailer.js
