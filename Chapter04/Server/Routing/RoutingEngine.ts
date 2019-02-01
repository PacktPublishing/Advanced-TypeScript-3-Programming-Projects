import { Router } from "./Router";
export class RoutingEngine {
    constructor(private routing: Router[] = new Array<Router>()) {
    }
    public Add<T1 extends Router>(routing: (new () => T1), route: any) {
        const routed = new routing();
        routed.AddRoute(route);
        this.routing.push(routed);
    }
}
