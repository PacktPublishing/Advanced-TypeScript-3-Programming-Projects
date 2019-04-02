import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Mongo} from "./Database/Database";
import {SecuredDatabase} from "./Database/Types";
import socket from "socket.io";
import {UserCount} from "./userCount";
import * as http from "http";

@Mongo(SecuredDatabase.connection)
export abstract class Server {
  private router: any;
  private readonly port: number = 3000;
  protected app: any = express();

  //  protected abstract AddRouting(routingEngine: RoutingEngine, router: any): void;

  protected get App() { return this.app; }
  public Start(): void {
    this.app.use(bodyParser.json({ limit: `100mb` }));
    this.app.use(bodyParser.urlencoded({ limit: `100mb`, extended: true }));
    this.router = express.Router();
    //    this.AddRouting(this.routingEngine, this.router);
    this.app.use(this.router);
    this.OnStart();
    this.app.listen(this.port, () => console.log(`Express server running on port ${this.port}`));
    this.OnStarted();
  }

  protected OnStart(): void {
  }

  protected  OnStarted(): void {

  }
}

export class SocketServer extends Server {
  private userCount: UserCount = new UserCount();

  protected OnStarted(): void {
    super.OnStarted();
    if (this.App) {
      const http1 = new http.Server(this.App);
      const appSocket = socket(http1);
      this.OnConnect(appSocket);
    }
  }

  private OnConnect(app: socket.Server) {
    app.on('connect', (socket: any) => {
      // We maintain a metric of how many users we currently have
      this.userCount.Joined();
      socket.on('disconnect', () => {
        this.userCount.Left();
      })
    });
  }
}

new SocketServer().Start();
