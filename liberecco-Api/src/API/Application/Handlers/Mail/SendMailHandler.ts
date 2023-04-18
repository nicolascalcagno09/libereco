
import SendMailCommand from '../../Commands/Mail/SendMailCommand';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export default class MailSenderHandler {
	
	constructor() {
	}

	public async  handle(command : SendMailCommand) {
		dotenv.config();
		let transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			auth: {
			  user: process.env.MAIL_USERNAME,
			  pass: process.env.MAIL_PASSWORD 
			},
			secure: process.env.MAIL_SECURE || false,
			port: process.env.MAIL_PORT || 465,
			tls: {
				rejectUnauthorized: false
			}
		});
		let mailOptions = {
			from: process.env.MAIL_FROM_ADDRESS, 
			to: command.getMailTo(),
			subject: command.getSubject(),
			html: command.getContent()
		  };
		let info = await transporter.sendMail(mailOptions);
		return info;
	  }
}
