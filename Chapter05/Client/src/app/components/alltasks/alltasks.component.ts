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

  tasks: Observable<ITodoItem[]>;
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.tasks = this.apollo.watchQuery<TodoItemQuery>({
      query: gql`
        query TodoItems {
          TodoItems {
            Id,
            Title,
            Description,
            CreationDate
          }
        }
      `
    })
    .valueChanges
    .pipe(map(r => r.data.TodoItems));
  }
}
