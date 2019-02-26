import { Component, OnInit, Input, Output } from '@angular/core';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'atp-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  private inEdit = false;
  constructor(private apollo: Apollo) { }

  @Input() Todo: ITodoItem;

  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  Delete() {
    console.log(this.Todo.Id);
    this.apollo.mutate({
      mutation: gql`
      mutation Remove($Id: String!) {
        Remove(Id: $Id)
      }
      `, variables: {
        Id: this.Todo.Id
      }
    });
    // Reset the edit state.
    this.Edit(false);
  }

  ngOnInit() {
  }

}
