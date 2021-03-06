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
const http_ts_1 = require("http.ts");
const form_pipe_1 = require("form.pipe");
const inject_ts_1 = require("inject.ts");
const swagger_ts_1 = require("swagger.ts");
const logger_1 = require("@util/logger");
const ocr_1 = require("../entity/ocr");
const midware_1 = require("../entity/midware");
let MainController = class MainController extends http_ts_1.Server.Controller {
    get() {
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
    import() {
        const out = [];
        this.pipe(new form_pipe_1.FormPipe()).pipe(this.ocr.stream()).on('data', (res) => out.push(res)).on('error', (err) => {
            this.logger.warn(err);
            this.status(500).send(err.toString());
        }).on('finish', () => {
            this.status(200).json(out);
        });
    }
};
__decorate([
    inject_ts_1.Inject(logger_1.default),
    __metadata("design:type", logger_1.default)
], MainController.prototype, "logger", void 0);
__decorate([
    inject_ts_1.Inject(ocr_1.default),
    __metadata("design:type", ocr_1.default)
], MainController.prototype, "ocr", void 0);
__decorate([
    http_ts_1.Get('ocr'),
    http_ts_1.Midware(midware_1.default.url),
    swagger_ts_1.Meta.param.query('url', 'file to test', { schema: { type: 'string', example: 'https://tesseract.projectnaptha.com/img/eng_bw.png' } }),
    swagger_ts_1.Meta.responses(200, 'good'),
    swagger_ts_1.Meta.responses(500, 'bad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "get", null);
__decorate([
    http_ts_1.Post('ocr'),
    http_ts_1.Midware(midware_1.default.file),
    swagger_ts_1.Meta.param.formData('file', 'file to upload', { type: 'file' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MainController.prototype, "import", null);
MainController = __decorate([
    http_ts_1.Controller('/api/v1')
], MainController);
exports.default = MainController;
//# sourceMappingURL=main.js.map