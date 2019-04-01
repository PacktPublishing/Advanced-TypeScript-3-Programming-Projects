import { ITodoItem } from '../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import { OverdueTodoItemQuery, TodoItemQuery } from 'src/app/types/TodoItemQuery';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
export class SubscriptionBase {
  todos: ITodoItem[] = new Array<ITodoItem>();
  constructor(private apollo: Apollo) {
  }
  protected Subscribe<T extends OverdueTodoItemQuery | TodoItemQuery>(gqlQuery: unknown): Observable<ApolloQueryResult<T>> {
    return this.apollo.query<T>({
      query: gqlQuery,
      fetchPolicy: 'no-cache'
    });
  }
  resubscribe = (event: string) => {
    const index = this.todos.findIndex(x => x.Id === event);
    this.todos.splice(index, 1);
  }
}
