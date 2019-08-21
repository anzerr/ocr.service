
import 'reflect-metadata';
import {Inject} from 'inject.ts';
import {TesseractWorker} from 'tesseract.js';
import * as path from 'path';
import {Transform} from 'stream';
import Logger from '@util/logger';

export default class Ocr {

	worker: any;
	ext: {[key: string]: boolean};

	@Inject(Logger)
	logger: Logger;

	constructor() {
		this.worker = new TesseractWorker();
		this.ext = {
			'.png': true,
			'.jpg': true
		};
	}

	stream(): any {
		return new Transform({
			objectMode: true,
			transform: (file, encoding, callback: any) => {
				try {
					if (!this.ext[path.parse(file.filename).ext]) {
						return callback(new Error('invalid file type'));
					}

					const out = [];
					file.stream.on('data', (d) => out.push(d)).on('end', () => {
						this.runPath(Buffer.concat(out)).then((res) => {
							callback(null, res);
						}).catch((err) => {
							console.log('here', err);
							callback(err);
						});
					});
				} catch (err) {
					callback(err);
				}
			}
		});
	}

	runPath(imagpathe: any): Promise<any> {
		return this.worker.recognize(imagpathe).progress((info) => {
			this.logger.log(info);
		}).then((data) => data.text);
	}

}

