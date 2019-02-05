"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddRouter_1 = require("./AddRouter");
const FindByIdRouter_1 = require("./FindByIdRouter");
const GetPicturesRouter_1 = require("./GetPicturesRouter");
const RoutingEngine_1 = require("./RoutingEngine");
class Routes {
    constructor(router, routingEngine = new RoutingEngine_1.RoutingEngine()) {
        this.router = router;
        this.routingEngine = routingEngine;
    }
    AddRoutes() {
        this.routingEngine.Add(AddRouter_1.AddPictureRouter, this.router);
        this.routingEngine.Add(GetPicturesRouter_1.GetPicturesRouter, this.router);
        this.routingEngine.Add(FindByIdRouter_1.FindByIdRouter, this.router);
    }
}
exports.Routes = Routes;
