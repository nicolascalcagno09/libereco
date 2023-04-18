import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

import * as _ from 'lodash';

export default class SendMailCommand extends Command {
	mailTo;
	content;
	subject;
	constructor(body) {
		super();
		this.mailTo = body.mailTo;
		this.content = body.content;
		this.subject = body.subject;
	}
	getMailTo(){
		return this.mailTo;
	}

	getContent() {
		return this.content;
	}
	getSubject() {
		return this.subject;
	}

}