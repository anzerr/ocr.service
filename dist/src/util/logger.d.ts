import Config from '@util/config';
export default class Logger {
    config: Config;
    private id;
    constructor();
    log(...arg: any[]): Logger;
    warn(...arg: any[]): Logger;
    error(...arg: any[]): Logger;
}
