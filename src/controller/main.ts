
import 'reflect-metadata';
import {Server, Controller, Get, Post, Midware} from 'http.ts';
import {FormPipe} from 'form.pipe';
import {Inject} from 'inject.ts';
import {Meta} from 'swagger.ts';
import Logger from '@util/logger';
import Ocr from '../entity/ocr';
import midware from '../entity/midware';

@Controller('/api/v1')
export default class MainController extends Server.Controller {

	@Inject(Logger)
	logger: Logger;

	@Inject(Ocr)
	ocr: Ocr;

	@Get('ocr')
	@Midware(midware.url)
	@Meta.param.query('url', 'file to test', {schema: {type: 'string', example: 'https://tesseract.projectnaptha.com/img/eng_bw.png'}})
	@Meta.responses(200, 'good')
	@Meta.responses(500, 'bad')
	get(): Promise<any> {
		if (!this.query.url) {
			return this.status(500).send('missing url');
		}
		// add check is url
		return this.ocr.runPath(this.query.url).then((res) => {
			return this.status(200).json(res);
		}).catch((err) => {
			const msg = err.toString();
			return this.status(500).send(msg === '[object Object]' ? 'somethign wen\'t wrong' : msg);
		});
	}

	@Post('ocr')
	@Midware(midware.file)
	@Meta.param.formData('file', 'file to upload', {type: 'file'})
	import(): any {
		const out = [];
		this.pipe(new FormPipe()).pipe(this.ocr.stream()).on('data', (res) => out.push(res)).on('error', (err) => {
			this.logger.warn(err);
			this.status(500).send(err.toString());
		}).on('finish', () => {
			this.status(200).json(out);
		});
	}

}
