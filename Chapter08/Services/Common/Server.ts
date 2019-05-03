import express, { Router, Request, Response, response } from "express";
import { Environment } from "./Configuration/Environment";
import { RoutingEngine } from "./Routing/RoutingEngine";
import cors from "cors";
import firebase from "firebase";
import bodyParser = require("body-parser");

export abstract class Server {
  constructor(private port: number = 3000, private app: any = express(), protected routingEngine: RoutingEngine = new RoutingEngine()) {}

  public WithCorsSupport(): Server {
    this.app.use(cors());
    return this;
  }

  public Start(): void {
    // this.app.use((req: Request, res: Response, next: any) => {
    //   res.setHeader("access-control-allow-credentials", "true");
    //   res.setHeader("access-control-allow-headers", "X-Requested-With,Content-Type,Accept,Origin");
    //   res.setHeader("access-control-allow-methods", "*");
    //   res.setHeader("server", "Powered by TypeScript 3");
    //   res.setHeader("cache-control", "nocache");
    //   res.setHeader("date", new Date().toISOString());
    //   next();
    // });
    this.app.use(bodyParser.json()); 
    this.app.use(bodyParser.urlencoded({extended:true}));
    const router: Router = express.Router();
    this.AddRouting(router);
    this.app.use(router);
    this.app.listen(this.port, ()=> console.log(`logged onto people server at ${this.port}`));
  }

  protected AddRouting(router: Router): void {

  }
  
  public WithDatabase(): Server {
    firebase.initializeApp(Environment.fireBase);
    return this;
  }

}