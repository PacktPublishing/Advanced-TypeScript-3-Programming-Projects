import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { TodoItemQuery } from '../../types/TodoItemQuery';
import { SubscriptionBase } from 'src/app/types/SubscriptionBase';

@Component({
  selector: 'atp-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.scss']
})

export class AlltasksComponent extends SubscriptionBase implements OnInit {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  ngOnInit() {
    this.Subscribe<TodoItemQuery>(gql`query ItemsQuery {
      TodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }`).subscribe(todo => {
      this.todos = new Array<ITodoItem>();
      todo.data.TodoItems.forEach(x => {
        this.todos.push(x);
      });
    });
  }
}
