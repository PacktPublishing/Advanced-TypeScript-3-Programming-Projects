import socket from "socket.io";
import {Server} from "./server";
import {UserCount} from "./userCount";

export class SocketServer extends Server {
  private userCount: UserCount = new UserCount();
  public Start(): void {
    super.Start();
    const app: socket.Server = socket(this.app);
    this.OnConnect(app);
  }

  private OnConnect(app: socket.Server) {
    app.on('connect', (socket) => {
      // We maintain a metric of how many users we currently have
      this.userCount.Joined();
      socket.on('disconnect', () => {
        this.userCount.Left();
      })
    });
  }
}