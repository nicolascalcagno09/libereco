import { generatePushNotification } from '../Common/GeneratePushNotification';
import { success } from '../Common/Result';

export default class SMSController {

	accountSid = process.env.TWILIO_ACCOUNT_SID
	authToken = process.env.TWILIO_AUTH_TOKEN
	serviceId = process.env.TWILIO_SERVICE_ID
	appId = process.env.TWILIO_APP_ID

	constructor() { }

	public async send(request, response, next) {
		if (request.body.app_id && request.body.app_id == this.appId) {
			var twilio = require('twilio');
			var client = new twilio(this.accountSid, this.authToken);
			let phone = request.body.phone;
			let code = request.body.code;
			client.verify.services(this.serviceId)
				.verifications
				.create({ to: phone, channel: 'sms' })
				.then(verification => {
					console.log(verification.status)
					return response.status(200).json(success({ status: verification.status }, 'OK', 200));
				})
				.catch((message) => {
					console.log(message)
					return response.status(200).json(success({ status: message }, 'OK', 200));
				});
		} else {
			return response.status(401).json(success({}, 'Unauthorized', 401));
		}
	}


	public async verify(request, response, next) {
		if (request.body.app_id && request.body.app_id == this.appId) {
			var twilio = require('twilio');
			var client = new twilio(this.accountSid, this.authToken);
			let phone = request.body.phone;
			let code = request.body.code;
			client.verify.services(this.serviceId)
				.verificationChecks
				.create({ to: phone, code: code })
				.then(verification_check => {
					console.log(verification_check.status)
					return response.status(200).json(success({ status: verification_check.status }, 'OK', 200));
				})
				.catch((message) => {
					console.log(message)
					return response.status(200).json(success({ status: message }, 'OK', 200));
				});
		} else {
			return response.status(401).json(success({}, 'Unauthorized', 401));

		}
	}
	
}