import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {SocketServer} from "./socketServer";
//import { Mongo } from "./Database";
//import { RoutingEngine } from "./Routing/RoutingEngine";

export abstract class Server {
  private router: any;

  constructor(private port: number = 3000, protected app: any = express()) {
  }

  public WithCorsSupport(): Server {
    this.app.use(cors());
    return this;
  }

  //  protected abstract AddRouting(routingEngine: RoutingEngine, router: any): void;

  public Start(): void {
    this.app.use(bodyParser.json({ limit: `100mb` }));
    this.app.use(bodyParser.urlencoded({ limit: `100mb`, extended: true }));
    //    this.mongo.Connect();
    //    this.router = express.Router();
    //    this.AddRouting(this.routingEngine, this.router);
    this.app.use(this.router);
    this.OnStart();
    this.app.listen(this.port, () => console.log(`Express server running on port ${this.port}`));
  }

  protected OnStart(): void {
  }
}

new SocketServer().Start();
