import { Component, OnInit } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'atp-openchat',
  templateUrl: './openchat.component.html',
  styleUrls: ['./openchat.component.scss']
})
export class OpenchatComponent implements OnInit {

  private messages:string[] = new Array<string>();
  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.on('userLogOn', (msg:any) => {
      this.messages.push(`${msg.user} logged on at ${msg.time}`)
    });
  }

  public get Messages(): string[] { return this.messages; }
}
