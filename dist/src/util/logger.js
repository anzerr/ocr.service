"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inject_ts_1 = require("inject.ts");
const color = require("console.color");
const config_1 = require("@util/config");
let Logger = class Logger {
    constructor() {
        this.id = 0;
        process.on('unhandledRejection', (reason, p) => {
            this.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        });
    }
    log(...arg) {
        if (this.config.get().log) {
            console.log(`${color.green('Api')}:${color.white(this.id++)}:${color.white((new Date()).toUTCString())} -`, ...arg);
        }
        return this;
    }
    warn(...arg) {
        return this.log(...arg.map((a) => color.yellow(a)));
    }
    error(...arg) {
        return this.log(...arg.map((a) => color.red(a)));
    }
};
__decorate([
    inject_ts_1.Inject(config_1.default),
    __metadata("design:type", config_1.default)
], Logger.prototype, "config", void 0);
Logger = __decorate([
    inject_ts_1.Injectable(),
    __metadata("design:paramtypes", [])
], Logger);
exports.default = Logger;
//# sourceMappingURL=logger.js.map