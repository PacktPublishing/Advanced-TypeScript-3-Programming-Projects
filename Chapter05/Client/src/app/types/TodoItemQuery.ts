import { ITodoItem } from '../../../../Common/models/TodoItem';

export interface TodoItemQuery {
  // The name of the property is going to map back to the name in the query
  TodoItems: ITodoItem[];
}

export interface OverdueTodoItemQuery {
  OverdueTodoItems: ITodoItem[];
}
