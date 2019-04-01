import { Component, OnInit, Input, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Guid } from 'guid-typescript';
import { ITodoItemInput } from '../../../../../Common/models/ITodoItemInput';
import { TodoItemInput } from 'src/app/types/TodoItemInput';

@Component({
  selector: 'atp-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  Title: string;
  Description?: string;
  DueDate: Date;
  EarliestDate: Date;

  ngOnInit() {
    this.EarliestDate = new Date();
  }

  Add(): void {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.Completed = false;
    todo.Id = Guid.create().toString();
    todo.CreationDate = new Date();
    todo.Title = this.Title;
    todo.Description = this.Description;
    todo.DueDate = this.DueDate;

    this.apollo.mutate({
      mutation: gql`
        mutation Add($input: TodoItemInput!) {
          Add(TodoItem: $input) {
            Title
          }
        }
      `, variables: {
        input: todo
      }
    }).subscribe();
    this.Reset();
  }

  private Reset(): void {
    this.Title = ``;
    this.Description = ``;
    this.DueDate = null;
  }
}
