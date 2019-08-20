
import 'reflect-metadata';
import {Inject} from 'inject.ts';
import {TesseractWorker} from 'tesseract.js';
import * as fs from 'fs.promisify';
import * as path from 'path';
import * as remove from 'fs.remove';
import {Transform} from 'stream';
import Logger from '@util/logger';

export default class Ocr {

	worker: any;

	@Inject(Logger)
	logger: Logger;

	constructor() {
		this.worker = new TesseractWorker();
	}

	stream(): any {
		return new Transform({
			objectMode: true,
			transform: (file, encoding, callback: any) => {
				try {
					const name = Math.random().toString(36).substr(2) + path.parse(file.filename).ext,
						dir = path.join(__dirname, name);

					file.stream.pipe(fs.createWriteStream(dir)).on('close', () => {
						return this.runPath(dir).then((res) => {
							return remove(dir).then(() => res);
						}).then((res) => {
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

	runPath(imagpathe: string): Promise<any> {
		return this.worker.recognize(imagpathe).progress((info) => {
			this.logger.log(info);
		}).then((data) => data.text);
	}

}

