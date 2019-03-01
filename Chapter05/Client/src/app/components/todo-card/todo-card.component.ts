import { Component, OnInit, Input, Output } from '@angular/core';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'atp-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  private inEdit = false;
  EarliestDate: Date;

  constructor(private apollo: Apollo) {
    this.EarliestDate = new Date();
  }

  @Input() Todo: ITodoItem;
  @Output() done: EventEmitter<string> = new EventEmitter<string>();

  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  Save() {
    // 1
  }

  Delete() {
    this.apollo.mutate({
      mutation: gql`
      mutation Remove($Id: String!) {
        Remove(Id: $Id)
      }
      `, variables: {
        Id: this.Todo.Id
      }
    }).subscribe();
    this.done.emit(this.Todo.Id);
  }

  ngOnInit() {
  }

}
