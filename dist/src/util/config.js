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
var Config_1;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inject_ts_1 = require("inject.ts");
let Config = Config_1 = class Config {
    constructor() {
        this.config = null;
    }
    get() {
        if (!this.config) {
            this.config = require(Config_1.path);
        }
        return this.config;
    }
};
Config.path = 'THIS_SHOULD_BE_DEFINED';
Config = Config_1 = __decorate([
    inject_ts_1.Injectable(),
    __metadata("design:paramtypes", [])
], Config);
exports.default = Config;
//# sourceMappingURL=config.js.map