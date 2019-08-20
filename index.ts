
console.log('.', new Date().toString()); // docker sanity check
require('alias.util').package();

import 'reflect-metadata';
import {Server} from 'http.ts';
import {Swagger, SwaggerDocument} from 'swagger.ts';
import * as path from 'path';
import * as color from 'console.color';
import Config from '@util/config';
import MainController from '@controller/main';

if (process.argv[2] || process.env.config) {
	Config.path = path.join(__dirname, process.env.config || process.argv[2]);
} else {
	Config.path = path.join(__dirname, './config.js');
}
console.log('config.path', Config.path, require(Config.path));

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger, MainController]);

s.on('log', (arg) => {
	if (arg[0] === 'request') {
		console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), color.white(arg[1]));
	}
}).on('error', (err) => {
	console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), 'failed here', color.red(err));
});

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	return s;
}).catch((err) => {
	console.log(err);
	process.exit(1);
});

