import 'reflect-metadata';
import Logger from '@util/logger';
export default class Ocr {
    worker: any;
    ext: {
        [key: string]: boolean;
    };
    logger: Logger;
    constructor();
    stream(): any;
    runPath(imagpathe: any): Promise<any>;
}
