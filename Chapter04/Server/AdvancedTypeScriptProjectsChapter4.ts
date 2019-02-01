import { RoutingEngine } from "./Routing/RoutingEngine";
import { AddPictureRouter } from "./Routing/AddRouter";
import { GetPicturesRouter } from "./Routing/GetPicturesRouter";
import { FindByIdRouter } from "./Routing/FindByIdRouter";
import { Server } from "./server";
export class AdvancedTypeScriptProjectsChapter4 extends Server {
    protected AddRouting(routingEngine: RoutingEngine, router: any): void {
        routingEngine.Add(AddPictureRouter, router);
        routingEngine.Add(GetPicturesRouter, router);
        routingEngine.Add(FindByIdRouter, router);
    }
}

new AdvancedTypeScriptProjectsChapter4(3000).WithCorsSupport().Start();