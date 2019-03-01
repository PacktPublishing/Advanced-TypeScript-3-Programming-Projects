import { ITodoSchema, TodoModel } from "./Schema";
import { DataAccessBase } from "./DataAccessBase";
export class TodoDataAccess extends DataAccessBase<ITodoSchema> {
  constructor() {
    super(TodoModel);
  }
}
