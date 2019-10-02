import { post, param, get } from '@loopback/rest';
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
  async sendMail(@param.path.string('userEmail') userEmail: string
  ) {
    const auth = {
      auth: {
        api_key: '8c6b55062837bc8415ab9ac306a5c623-af6c0cec-32369b77',
        domain: 'sandbox07ab5c3c39014eee89cac7d780175217.mailgun.org'
      }
    }
    let transporter = nodemailer.createTransport(nodemailerMailGun(auth))

    const mailOptions = {
      from: 'Meet <MEET@E-Tendering.mail.org>',
      to: userEmail,
      subject: "MEET Sybmission Results",
      html: '<h1>You have Won the Tender Process With Id:  </h1>'

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
