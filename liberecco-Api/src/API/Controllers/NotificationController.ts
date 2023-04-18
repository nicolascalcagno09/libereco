import { generatePushNotification, INotification, INotificationPayload } from '../Common/GeneratePushNotification';
import { success } from '../Common/Result';
import UserAppServices from '../Application/Services/UserApps/UserAppServices';


export default class NotificationController {
	private userAppServices: UserAppServices;

	constructor() {
		this.userAppServices = new UserAppServices();
	}

	public async sendPush(request, response, next) {

		try {
			console.log(request);

			if (!(request.body.promocionId || request.body.novedadId || request.body.canjeableId)) {
				throw new Error("Debe enviar una promocion, novedad o canjeable ID");
			}

			let notiPayload: INotificationPayload;
			if(request.body.promocionId) {
				notiPayload = await this.userAppServices.getNotificationDataAndTokenByPromocionId(request.body.promocionId);
			}

			if(request.body.novedadId) {
				notiPayload = await this.userAppServices.getNotificationDataAndTokenByNovedadId(request.body.novedadId);
			}

			if(request.body.canjeableId) {
				notiPayload = await this.userAppServices.getNotificationDataAndTokenByCanjeableId(request.body.canjeableId);
			}
		
			await generatePushNotification(notiPayload.registration_ids, notiPayload.notification);
			return response.status(200).json(success({ status: "ok" }, 'OK', 200));
		} catch (e) {
			next(e)
		}
	}

	public async sendPushToAll(request, response, next) {
		try {
			let tokens = await this.userAppServices.getAllUsersAppTokens();

			let notiPayload: INotification = {
				title: request.body.title,
				body: request.body.body,
				subtitle: request.body.subtitle
			};

			await generatePushNotification(tokens, notiPayload)
			return response.status(200).json(success({ status: "ok" }, 'OK', 200));
		} catch (e) {
			next(e)
		}


	}
}