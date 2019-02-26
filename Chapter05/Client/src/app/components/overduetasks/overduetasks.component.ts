import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import { TodoItemQuery } from 'src/app/types/TodoItemQuery';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'atp-overduetasks',
  templateUrl: './overduetasks.component.html',
  styleUrls: ['./overduetasks.component.scss']
})
export class OverduetasksComponent implements OnInit {

  todos: Observable<ITodoItem[]>;
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.todos = this.apollo.watchQuery<TodoItemQuery>({
      query: gql`
        query OverdueTodoItems {
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
  }

}
