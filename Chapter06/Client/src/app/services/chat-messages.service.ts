import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material";
import {UserLogon} from "../Types/user.logon";

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  constructor(private socket: Socket, private snackBar: MatSnackBar) { }

  public JoinRoom = (room: string) => {
    this.socket.emit('joinRoom', room);
  };

  public SendMessage = (message: string) => {
    this.socket.emit('message', message);
  };

  public DefaultMessages = () => {
    this.socket.fromEvent<UserLogon>('userLogOn').subscribe((msg:UserLogon) => {
      this.snackBar.open(`${msg.user} logged on`, 'Welcome', { duration: 3000});
    });

    return Observable.create((ob) => {
      this.socket.on('message', msg => {
        ob.next(msg);
      });
      this.socket.on('allMessages', (msg:any[]) => {
        msg.forEach((text:any) => ob.next(text.messageText));
      });
    })
  };

  public SecureMessages = (room: string) => {
    this.socket.fromEvent('join').subscribe(() => {
      this.socket.fromEvent<UserLogon>('userLogOn').subscribe((msg:UserLogon) => {
        this.snackBar.open(`${msg.user} logged on in room`, 'Welcome', {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      });
    });
    return Observable.create((ob) => {
      this.socket.on('message', (msg:string) => {
        ob.next(msg);
      });
      this.socket.on('allMessages', (msg:any) => {
        msg.forEach((text:any) => ob.next(text.messageText));
      });
    });
  }
}
