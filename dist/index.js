"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('.', new Date().toString()); // docker sanity check
require('alias.util').package();
require("reflect-metadata");
const http_ts_1 = require("http.ts");
const swagger_ts_1 = require("swagger.ts");
const path = require("path");
const color = require("console.color");
const config_1 = require("@util/config");
const main_1 = require("@controller/main");
if (process.argv[2] || process.env.config) {
    config_1.default.path = path.join(__dirname, process.env.config || process.argv[2]);
}
else {
    config_1.default.path = path.join(__dirname, './config.js');
}
console.log('config.path', config_1.default.path, require(config_1.default.path));
const document = new swagger_ts_1.SwaggerDocument();
const s = new http_ts_1.Server(3000)
    .withController([swagger_ts_1.Swagger, main_1.default]);
s.on('log', (arg) => {
    if (arg[0] === 'request') {
        console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), color.white(arg[1]));
    }
}).on('error', (err) => {
    console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), 'failed here', color.red(err));
});
s.start().then(() => {
    swagger_ts_1.Swagger.json = document.withServer(s).toJson();
    return s;
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map