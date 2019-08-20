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
require("reflect-metadata");
const inject_ts_1 = require("inject.ts");
const tesseract_js_1 = require("tesseract.js");
const fs = require("fs.promisify");
const path = require("path");
const remove = require("fs.remove");
const stream_1 = require("stream");
const logger_1 = require("@util/logger");
class Ocr {
    constructor() {
        this.worker = new tesseract_js_1.TesseractWorker();
    }
    stream() {
        return new stream_1.Transform({
            objectMode: true,
            transform: (file, encoding, callback) => {
                try {
                    const name = Math.random().toString(36).substr(2) + path.parse(file.filename).ext, dir = path.join(__dirname, name);
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
                }
                catch (err) {
                    callback(err);
                }
            }
        });
    }
    runPath(imagpathe) {
        return this.worker.recognize(imagpathe).progress((info) => {
            this.logger.log(info);
        }).then((data) => data.text);
    }
}
__decorate([
    inject_ts_1.Inject(logger_1.default),
    __metadata("design:type", logger_1.default)
], Ocr.prototype, "logger", void 0);
exports.default = Ocr;
//# sourceMappingURL=ocr.js.map