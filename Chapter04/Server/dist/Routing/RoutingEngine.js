"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoutingEngine {
    constructor(routing = new Array()) {
        this.routing = routing;
    }
    Add(routing, route) {
        const routed = new routing();
        routed.AddRoute(route);
        this.routing.push(routed);
    }
}
exports.RoutingEngine = RoutingEngine;
