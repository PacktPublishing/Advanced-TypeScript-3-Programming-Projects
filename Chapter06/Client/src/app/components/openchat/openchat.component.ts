import { Component, OnInit } from '@angular/core';
import {ChatMessagesService} from "../../services/chat-messages.service";

@Component({
  selector: 'atp-openchat',
  templateUrl: './openchat.component.html',
  styleUrls: ['./openchat.component.scss']
})
export class OpenchatComponent implements OnInit {

  messages: string[] = [];
  constructor(private chatMessages: ChatMessagesService) { }

  ngOnInit() {
    this.chatMessages.SecureMessages('secret');
    this.chatMessages.DefaultMessages().subscribe((msg: string) =>{
      this.messages.push(msg)
    });
  }
}
