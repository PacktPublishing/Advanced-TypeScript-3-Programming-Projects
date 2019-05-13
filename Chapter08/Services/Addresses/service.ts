import { Router } from "express";
import { Server } from "../Common/Server";
import { SaveAddressRouting } from "./Routing/SaveAddressRouting";
import { GetAddressRouting } from "./Routing/GetAddressRouting";

export class AddressesServer extends Server {
  protected AddRouting(router: Router): void {
    this.routingEngine.Add(GetAddressRouting, router);
    this.routingEngine.Add(SaveAddressRouting, router);
  }
}

new AddressesServer()
  .WithCorsSupport()
  .WithDatabase().Start();  