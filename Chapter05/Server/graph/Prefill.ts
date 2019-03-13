import { TodoItem } from "./TodoItem";
import { TodoDataAccess } from "../database/TodoDataAccess";
export class Prefill {
  private static prefill: Prefill;
  private readonly items: TodoItem[] = new Array<TodoItem>();
  private readonly dataAccess: TodoDataAccess = new TodoDataAccess();
  private constructor() {
  }
  public async Populate(): Promise<void> {
    await this.dataAccess.GetAll().then(x => {
      x.forEach(item => {
        const todoItem: TodoItem = new TodoItem();
        todoItem.Id = item.Id;
        todoItem.Completed = item.Completed;
        todoItem.CreationDate = item.CreationDate;
        todoItem.DueDate = item.DueDate;
        todoItem.Description = item.Description;
        todoItem.Title = item.Title;
        this.items.push(todoItem);
      });
    }).catch(x => {
      console.log(`Unfortunately, we couldn't retrieve all records ${x}`);
    });
  }
  public static get Instance() {
    return this.prefill || (this.prefill = new this());
  }
  get Items(): TodoItem[] {
    return this.items;
  }
}
