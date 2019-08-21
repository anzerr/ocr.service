"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_ts_1 = require("http.ts");
const type_util_1 = require("type.util");
class MidWare extends http_ts_1.Server.Controller {
    url() {
        const url = this.query.url;
        if (!url) {
            return this.status(400).json({ code: 400, error: 'Missing url' });
        }
        if (!type_util_1.default.string(url) || !url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/)) {
            return this.status(400).json({ code: 400, error: 'Invalid url format' });
        }
    }
    file() {
        const type = this.headers['content-type'];
        if (!type_util_1.default.string(type) || !type.match(/multipart\/form-data/)) {
            return this.status(400).json({ code: 400, error: 'Expected multipart content-type' });
        }
    }
}
exports.default = new MidWare();
//# sourceMappingURL=midware.js.map