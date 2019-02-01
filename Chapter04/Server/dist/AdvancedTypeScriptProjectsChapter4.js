"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddRouter_1 = require("./Routing/AddRouter");
const GetPicturesRouter_1 = require("./Routing/GetPicturesRouter");
const FindByIdRouter_1 = require("./Routing/FindByIdRouter");
const server_1 = require("./server");
class AdvancedTypeScriptProjectsChapter4 extends server_1.Server {
    AddRouting(routingEngine, router) {
        routingEngine.Add(AddRouter_1.AddPictureRouter, router);
        routingEngine.Add(GetPicturesRouter_1.GetPicturesRouter, router);
        routingEngine.Add(FindByIdRouter_1.FindByIdRouter, router);
    }
}
exports.AdvancedTypeScriptProjectsChapter4 = AdvancedTypeScriptProjectsChapter4;
new AdvancedTypeScriptProjectsChapter4(3000).WithCorsSupport().Start();
