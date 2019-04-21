import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {UserLogon} from "../Types/user.logon";

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  constructor(private socket: Socket) { }

  private JoinRoom = (room: string) => {
    this.socket.emit('joinRoom', room);
  };

  public SendMessage = (message: string) => {
    this.socket.emit('message', message);
  };

  public GetMessages = (room: string) => {
    this.JoinRoom(room);
    return Observable.create((ob) => {
      this.socket.fromEvent<UserLogon>('userLogOn').subscribe((user:UserLogon) => {
        ob.next(`${user.user} logged on at ${user.time}`);
      });
      this.socket.on('message', (msg:string) => {
        ob.next(msg);
      });
      this.socket.on('allMessages', (msg:string[]) => {
        msg.forEach((text:any) => ob.next(text.messageText));
      });
    });
  }
}
