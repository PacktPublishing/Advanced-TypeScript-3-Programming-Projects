import { Component, OnInit, Input, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ITodoItemInput } from '../../../../../Common/models/ITodoItemInput';
import { TodoItemInput } from 'src/app/types/TodoItemInput';

@Component({
  selector: 'atp-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  Add(title: string, description: string, dueDate: Date): void {
    const input: ITodoItemInput = new TodoItemInput();
    input.CreationDate = new Date();
    input.DueDate = dueDate;
    input.Description = description;
    input.Title = title;

    this.apollo.mutate({
      mutation: gql`
        mutation Add($input: TodoItemInput!) {
          Add(TodoItem: $input) {
            Title
          }
        }
      `, variables: {
        input: input
      }
    }).subscribe();

  }
}
