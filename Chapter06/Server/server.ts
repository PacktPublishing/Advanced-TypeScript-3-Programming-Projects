import {Mongo} from "./Database/Database";
import {SecuredDatabase} from "./Database/Types";
import {UserCount} from "./userCount";
import socket = require('socket.io');

@Mongo(SecuredDatabase.connection)
export class SocketServer  {
  private userCount: UserCount = new UserCount();

  public Start() {
    this.OnStarted();
  }
  protected OnStarted(): void {
      const appSocket = socket(3000);
      this.OnConnect(appSocket);
  }

  private OnConnect(app: socket.Server) {
    app.on('connection', (socket: any) => {
      // We maintain a metric of how many users we currently have
      socket.on('loggedOn', (msg: any) => {
        this.userCount.Joined();
        socket.emit('userLogOn', { user: msg, time: new Date() });
      });
      socket.on('disconnect', () => {
        this.userCount.Left();
      })
    });
  }
}

new SocketServer().Start();
