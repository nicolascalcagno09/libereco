import {
	isString,
	isFunction,
	isDirectory,
	walkSync
} from 'simple-command-bus/lib/utils';

import {
	HandlerLocator,
	MissingHandlerException,
	InvalidCommandException,
} from 'simple-command-bus';

function recursiveFlat (acc, item){
	if (Array.isArray(item)) return acc.concat(item.reduce(recursiveFlat, Array()));
	else return acc.concat(item)
}

export default class NamespaceHandlerLocator extends HandlerLocator {
	handlers;

	basepath : string ;
	constructor(handlersPath = './') {
		super();

		this.basepath = handlersPath;
		if (!handlersPath || !isDirectory(handlersPath)) {
			throw new Error('Invalid commands path.');
		}
		this.handlers = walkSync(handlersPath).reduce(recursiveFlat, Array());
	}

	getHandlerForCommand(commandName) {
		if (isString(commandName) === false) {
			throw new InvalidCommandException();
		}

		const handlerName = `${commandName.replace(/Command$/, 'Handler')}`;
    const foundHandler = this.handlers.find(handler => handler.match(new RegExp(`(^|/|\\\\)${handlerName}\.(ts|js)$`)));

		if (!foundHandler) {
			MissingHandlerException.forCommand(commandName);
		}

		const Handler = require(foundHandler).default;

		if (isFunction(Handler) === false) {
			MissingHandlerException.forCommand(commandName);
		}

		return new Handler();
	}
}
