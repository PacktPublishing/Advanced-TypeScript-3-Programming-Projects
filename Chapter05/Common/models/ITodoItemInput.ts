import { ITodoItem } from "./TodoItem";
export interface ITodoItemInput extends ITodoItem {
  CreationDate?: Date;
}