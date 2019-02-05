import { IRouter } from "./Router";
export class RoutingEngine {
    constructor(private routing: IRouter[] = new Array<IRouter>()) {
    }
    public Add<T1 extends IRouter>(routing: (new () => T1), route: any) {
        const routed = new routing();
        routed.AddRoute(route);
        this.routing.push(routed);
    }
}
