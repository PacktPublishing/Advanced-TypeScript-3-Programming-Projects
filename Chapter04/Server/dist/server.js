"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var Server = /** @class */ (function () {
    function Server(app) {
        if (app === void 0) { app = express_1.default(); }
        this.app = app;
    }
    Server.prototype.WithCorsSupport = function () {
        this.app.use(cors_1.default());
        return this;
    };
    Server.prototype.Initialize = function (port) {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.get('/', function (req, res) { return res.send('Hello World!'); });
        this.app.listen(port, function () { return console.log("Express server running on port " + port); });
    };
    return Server;
}());
exports.Server = Server;
new Server().WithCorsSupport().Initialize(3000);
