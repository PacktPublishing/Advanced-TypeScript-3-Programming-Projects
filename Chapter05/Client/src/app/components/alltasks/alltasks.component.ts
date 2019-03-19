import { Component, OnInit } from '@angular/core';
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
  constructor(protected apollo: Apollo) {
  }

  ngOnInit() {
    this.subscribe(gql`
    query ItemsQuery {
      TodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }
  `);
  }

  resubscribe = (event: string) => {
    const index = this.todos.findIndex(x => x.Id === event);
    this.todos.splice(index, 1);
  }

  private subscribe(query: unknown) {
    const todos = this.apollo.watchQuery<TodoItemQuery>({
      query: query
    })
      .valueChanges
      .pipe(map(r => r.data.TodoItems));

    todos.subscribe(todo => {
      this.todos = new Array<ITodoItem>();
      todo.forEach(x => {
        this.todos.push(x);
      });
    });
  }
}
