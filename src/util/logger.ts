
import {Injectable, Inject} from 'inject.ts';
import * as color from 'console.color';
import Config from '@util/config';

@Injectable()
export default class Logger {

	@Inject(Config)
	config: Config;

	private id: number;

	constructor() {
		this.id = 0;
		process.on('unhandledRejection', (reason, p) => {
			this.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		});
	}

	log(...arg: any[]): Logger {
		if (this.config.get().log) {
			console.log(`${color.green('Api')}:${color.white(this.id++)}:${color.white((new Date()).toUTCString())} -`, ...arg);
		}
		return this;
	}

	warn(...arg: any[]): Logger {
		return this.log(...arg.map((a) => color.yellow(a)));
	}

	error(...arg: any[]): Logger {
		return this.log(...arg.map((a) => color.red(a)));
	}

}
