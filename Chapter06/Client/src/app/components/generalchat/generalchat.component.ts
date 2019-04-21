import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessagesService} from "../../services/chat-messages.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'atp-generalchat',
  templateUrl: './generalchat.component.html',
  styleUrls: ['./generalchat.component.scss']
})
export class GeneralchatComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  messages: string[] = [];
  constructor(private chatService: ChatMessagesService) { }

  ngOnInit() {
    this.subscription = this.chatService.GetMessages('').subscribe((msg: string) =>{
      this.messages.push(msg);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  CurrentMessage: string;

  SendMessage(): void {
    this.chatService.SendMessage(this.CurrentMessage);
    this.CurrentMessage = '';
  }
}
