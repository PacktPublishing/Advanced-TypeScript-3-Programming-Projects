import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { TodoItemInput } from '../types/TodoItemInput';
import { ITodoItemInput } from '../../../../Common/models/ITodoItemInput';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddtodoitemService {

  constructor(private apollo: Apollo) { }

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
