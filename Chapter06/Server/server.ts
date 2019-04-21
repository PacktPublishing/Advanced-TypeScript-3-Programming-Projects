import {Mongo} from "./Database/Database";
import {SecuredDatabase} from "./Database/Types";
import socket = require('socket.io');
import {IMessageSchema, MessageDataAccess} from "./Database/DataAccess/Messages";

@Mongo(SecuredDatabase.connection)
export class SocketServer  {
  constructor(private messageDataAccess: MessageDataAccess = new MessageDataAccess()) {}
  public Start() {
    this.OnStarted();
  }
  protected OnStarted(): void {
      const appSocket = socket(3000);
      this.OnConnect(appSocket);
  }

  private OnConnect(io: socket.Server) {
    io.on('connection', (socket: any) => {
      let lastRoom: string = '';
      socket.on('joinRoom', (room: string) => {
        if (lastRoom !== '') {
          socket.leave(lastRoom);
        }
        if (room !== '') {
          socket.join(room);
        }
        this.messageDataAccess.GetAll({room: room}, {messageText: 1, _id: 0}).then((msgs: string[]) =>{
          socket.emit('allMessages', msgs);
        });
        lastRoom = room;
      });

      socket.on('message', (msg: string) => {
        this.WriteMessage(io, msg, lastRoom);
      });

      socket.on('loggedOn', (msg: any) => {
        io.sockets.in('secret').emit('userLogOn', { user: msg, time: new Date() });
      });
    });
  }

  private WriteMessage(io: socket.Server, message: string, room: string) {
    this.SaveToDatabase(message, room).then(() =>{
      if (room !== '') {
        io.sockets.in(room).emit('message', message);
        return;
      }
      io.emit('message', message);
    });
  }

  private async SaveToDatabase(message: string, room: string) {
    const model: IMessageSchema = <IMessageSchema>{
      messageText: message,
      received: new Date(),
      room: room
    };
    try{
      await this.messageDataAccess.Add(model);
    }catch (e) {
      console.log(`Unable to save ${message}`);
    }
  }
}

new SocketServer().Start();
