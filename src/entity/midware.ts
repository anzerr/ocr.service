
import 'reflect-metadata';
import {Server} from 'http.ts';
import is from 'type.util';

class MidWare extends Server.Controller {

	url(): any {
		const url = this.query.url;
		if (!url) {
			return this.status(400).json({code: 400, error: 'Missing url'});
		}
		if (!is.string(url) || !url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/)) {
			return this.status(400).json({code: 400, error: 'Invalid url format'});
		}
	}

	file(): any {
		const type = this.headers['content-type'];
		if (!is.string(type) || !type.match(/multipart\/form-data/)) {
			return this.status(400).json({code: 400, error: 'Expected multipart content-type'});
		}
	}

}

export default new MidWare();
