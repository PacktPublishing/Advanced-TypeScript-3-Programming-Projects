import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessagesService} from "../../services/chat-messages.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'atp-secretchat',
  templateUrl: './secretchat.component.html',
  styleUrls: ['./secretchat.component.scss']
})
export class SecretchatComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  messages: string[] = [];

  constructor(private chatService: ChatMessagesService) {
  }

  ngOnInit() {
    this.messages = [];
    this.subscription = this.chatService.GetMessages('secret').subscribe((msg: string) =>{
      this.messages.push(msg)
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
