import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { TodoItemQuery } from '../../types/TodoItemQuery';

@Component({
  selector: 'atp-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.scss']
})

export class AlltasksComponent implements OnInit {

  todos: ITodoItem[] = new Array<ITodoItem>();
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    const todos = this.apollo.watchQuery<TodoItemQuery>({
      query: gql`
        query ItemsQuery {
          TodoItems {
            Id,
            Title,
            Description,
            DaysCreated,
            DueDate
          }
        }
      `
    })
    .valueChanges
    .pipe(map(r => r.data.TodoItems));

    todos.subscribe(todo => {
      todo.forEach(x => {
        this.todos.push(x);
      });
    });
  }

  resubscribe = (event) => {
    const index = this.todos.findIndex(x => x.Id === event);
    this.todos.splice(index, 1);
  }
}
