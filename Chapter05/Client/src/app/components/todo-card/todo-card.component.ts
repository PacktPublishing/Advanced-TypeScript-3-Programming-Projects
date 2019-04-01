import { Component, OnInit, Input, Output } from '@angular/core';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventEmitter } from '@angular/core';
import { ITodoItemInput } from '../../../../../Common/models/ITodoItemInput';
import { TodoItemInput } from 'src/app/types/TodoItemInput';

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
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  Save() {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.Completed = false;
    todo.CreationDate = new Date();
    todo.Title = this.Todo.Title;
    todo.Description = this.Todo.Description;
    todo.DueDate = this.Todo.DueDate;
    todo.Id = this.Todo.Id;
    this.apollo.mutate({
      mutation: gql`
        mutation Update($input: TodoItemInput!) {
          Update(TodoItem: $input)
        }
      `, variables: {
        input: todo
      }
    }).subscribe();

    this.Edit(false);
  }

  Complete() {
    this.apollo.mutate({
      mutation: gql`
      mutation Complete($input: String!) {
        Complete(Id: $input)
      }
      `, variables: {
        input: this.Todo.Id
      }
    }).subscribe();
    this.Edit(false);
    this.Todo.Completed = true;
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
    this.deleted.emit(this.Todo.Id);
  }

  ngOnInit() {
  }

}
