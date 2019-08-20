
import 'reflect-metadata';
import {Injectable} from 'inject.ts';

@Injectable()
export default class Config {

	static path = 'THIS_SHOULD_BE_DEFINED';
	private config: string;

	constructor() {
		this.config = null;
	}

	get(): any {
		if (!this.config) {
			this.config = require(Config.path);
		}
		return this.config;
	}

}
