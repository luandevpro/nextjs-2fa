import * as speakeasy from 'speakeasy';
import nodemailer from 'nodemailer';

export default async function handle(req, res) {
  const result = JSON.parse(req.body);
  const secret = await speakeasy.generateSecret({ length: 20 });
  const token = await speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });
  const mailOptions = {
    from: "'Mr. Fox 🦊' <user@website.com>", // sender address
    to: result.email, // list of receivers
    subject: 'Hello World', // Subject line
    text: `Hello World? `, // plain text body
    html: `<p>Token : ${token} , ${secret.base32}</p>`, // html body
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'username@gmail.com',
      pass: 'pw',
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    res.json({ secret: secret.base32 });
  });
}
