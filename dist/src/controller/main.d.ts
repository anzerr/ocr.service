import 'reflect-metadata';
import { Server } from 'http.ts';
import Logger from '@util/logger';
import Ocr from '../entity/ocr';
export default class MainController extends Server.Controller {
    logger: Logger;
    ocr: Ocr;
    get(): Promise<any>;
    import(): any;
}
