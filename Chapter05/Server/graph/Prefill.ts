import { TodoItem } from "./TodoItem";
import { TodoDataAccess } from "../database/TodoDataAccess";
export class Prefill {
  private static prefill: Prefill;
  private items: TodoItem[] = new Array<TodoItem>();
  private readonly dataAccess: TodoDataAccess = new TodoDataAccess();
  private constructor() {
  }
  public async Populate(): Promise<void> {
    try {
      const schema = await this.dataAccess.GetAll();
      this.items = new Array<TodoItem>();
      schema.forEach(item => {
        const todoItem: TodoItem = new TodoItem();
        todoItem.Id = item.Id;
        todoItem.Completed = item.Completed;
        todoItem.CreationDate = item.CreationDate;
        todoItem.DueDate = item.DueDate;
        todoItem.Description = item.Description;
        todoItem.Title = item.Title;
        this.items.push(todoItem);
      });
    } catch (error) {
      console.log(`Unfortunately, we couldn't retrieve all records ${error}`);
    }
  }
  public static get Instance() {
    return this.prefill || (this.prefill = new this());
  }
  get Items(): TodoItem[] {
    return this.items;
  }
}
