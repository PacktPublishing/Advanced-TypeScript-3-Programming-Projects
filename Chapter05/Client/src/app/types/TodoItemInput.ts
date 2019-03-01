import { ITodoItemInput } from '../../../../Common/models/ITodoItemInput';
export class TodoItemInput implements ITodoItemInput {
  Id: string;
  Title: string;
  Description?: string;
  DueDate: Date;
  CreationDate: Date;
  Completed: boolean;
}
