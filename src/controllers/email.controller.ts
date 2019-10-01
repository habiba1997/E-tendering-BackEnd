import { post, param } from '@loopback/rest';
const nodemailer = require('nodemailer');
const nodemailerMailGun = require('nodemailer-mailgun-transport');


export class EmailController {


  @post('/sendEmail/{userEmail}', {
    responses: {
      '200': {
        description: 'Email Successfully Sent',
      },
    },
  })
  async sendMail(@param.path.string('userEmail') userEmail: string) {
    const auth = {
      auth: {
        api_key: '3cec832c45b1c35bd9fb1b42a4f8a4ee-af6c0cec-5194ab9b',
        domain: 'sandbox07ab5c3c39014eee89cac7d780175217.mailgun.org'
      }
    }
    let transporter = nodemailer.createTransport(nodemailerMailGun(auth))

    const mailOptions = {
      from: 'Meet <MEET@E-Tendering.mail.org>',
      to: userEmail,
      subject: "Testmail",
      html: '<p>This is a mail</p>'

    }


    transporter.sendMail(mailOptions, function (err: any, data: any) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Message Sent!!!!')
      }
    })

  }
}
