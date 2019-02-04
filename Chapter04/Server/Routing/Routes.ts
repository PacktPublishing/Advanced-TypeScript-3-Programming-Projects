import { AddPictureRouter } from "./AddRouter";
import { FindByIdRouter } from "./FindByIdRouter";
import { GetPicturesRouter } from "./GetPicturesRouter";
import { RoutingEngine } from "./RoutingEngine";
export class Routes {
    constructor(private router: any, private routingEngine: RoutingEngine = new RoutingEngine()) {
    }
    public AddRoutes(): void {
        this.routingEngine.Add(AddPictureRouter, this.router);
        this.routingEngine.Add(GetPicturesRouter, this.router);
        this.routingEngine.Add(FindByIdRouter, this.router);
    }
}
