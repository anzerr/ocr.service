import 'reflect-metadata';
import Logger from '@util/logger';
export default class Ocr {
    worker: any;
    logger: Logger;
    constructor();
    stream(): any;
    runPath(imagpathe: string): Promise<any>;
}
