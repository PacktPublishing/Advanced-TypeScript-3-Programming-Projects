import { Router } from "express";
import { Server } from "../Common/Server";
//import { GetPeopleRouting } from "./Routing/GetPeopleRouting";
import { SaveLeadsRouting } from "./Routing/SaveLeadsRouting";

export class LeadsServer extends Server {
  protected AddRouting(router: Router): void {
    //this.routingEngine.Add(GetPeopleRouting, router);
    this.routingEngine.Add(SaveLeadsRouting, router);
  }
}

new LeadsServer()
  .WithCorsSupport()
  .WithDatabase().Start();  