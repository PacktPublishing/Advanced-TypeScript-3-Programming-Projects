import { Router } from "express";
import { Server } from "../Common/Server";
import { GetLeadsRouting } from "./Routing/GetLeadsRouting";
import { SaveLeadsRouting } from "./Routing/SaveLeadsRouting";

export class LeadsServer extends Server {
  protected AddRouting(router: Router): void {
    this.routingEngine.Add(GetLeadsRouting, router);
    this.routingEngine.Add(SaveLeadsRouting, router);
  }
}

new LeadsServer()
  .WithCorsSupport()
  .WithDatabase().Start();  