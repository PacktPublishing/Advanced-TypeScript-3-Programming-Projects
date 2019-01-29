"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server(port, app) {
        if (port === void 0) { port = 3000; }
        if (app === void 0) { app = express_1.default(); }
        this.port = port;
        this.app = app;
    }
    Server.prototype.WithCorsSupport = function () {
        this.app.use(cors_1.default());
        return this;
    };
    Server.prototype.WithHeaders = function () {
        var port = this.port;
        this.app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:" + port);
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            res.setHeader("Access-Control-Allow-Credentials", true);
            next();
        });
        return this;
    };
    Server.prototype.Start = function () {
        var _this = this;
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({extended: true}));
        this.OnStart();
        this.app.listen(this.port, function () { return console.log("Express server running on port " + _this.port); });
    };
    Server.prototype.OnStart = function () {
        this.app.get("/", function (request, response) { return response.send("Hello from the server"); });
    };
    return Server;
}());
exports.Server = Server;
new Server(3000).WithCorsSupport().WithHeaders().Start();
