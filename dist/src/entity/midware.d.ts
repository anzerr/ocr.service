import 'reflect-metadata';
import { Server } from 'http.ts';
declare class MidWare extends Server.Controller {
    url(): any;
    file(): any;
}
declare const _default: MidWare;
export default _default;
