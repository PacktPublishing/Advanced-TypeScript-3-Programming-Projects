import "reflect-metadata";
import { ResolverInterface, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Resolver } from "type-graphql";
import { TodoItem } from "./TodoItem";
import { TodoItemInput } from "./TodoItemInput";
import { Guid } from "guid-typescript";
import { Prefill } from "./Prefill";
import { TodoDataAccess } from "../database/TodoDataAccess";
import { ITodoSchema } from "../database/Schema";

@Resolver(() => TodoItem)
export class TodoItemResolver implements ResolverInterface<TodoItem> {
  private readonly milliSecondsPerDay = 1000 * 60 * 60 * 24;
  private readonly dataAccess: TodoDataAccess = new TodoDataAccess();

  @Query(() => TodoItem, { nullable: true })
  async TodoItem(@Arg("title") title: string): Promise<TodoItem | undefined> {
    return await Prefill.Instance.Items.find(todoItem => todoItem.Title === title);
  }

  @Query(() => [TodoItem], { description: "Get all the TodoItems" })
  async TodoItems(): Promise<TodoItem[]> {
    return await Prefill.Instance.Items;
  }

  @Mutation(() => TodoItem)
  async Add(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<TodoItem> {
    const todoItem = new TodoItem();
    todoItem.Id = Guid.create().toString();
    todoItem.CreationDate = todoItemInput.CreationDate;
    todoItem.DueDate = todoItemInput.DueDate;
    todoItem.Description = todoItemInput.Description;
    todoItem.Title = todoItemInput.Title;
    todoItem.Completed = false;
    await Prefill.Instance.Items.push(todoItem);
    const schema: ITodoSchema = this.CreateTodoSchema(todoItem)
    this.dataAccess.Add(schema);
    return todoItem;
  }

  private CreateTodoSchema(todoItem: TodoItem): ITodoSchema {
    return <ITodoSchema>{
      Id: todoItem.Id,
      CreationDate: todoItem.CreationDate,
      DueDate: todoItem.DueDate,
      Description: todoItem.Description,
      Title: todoItem.Title,
      Completed: false
    };
  }

  @Mutation(() => Boolean!)
  async Update(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<boolean> {
    const item: TodoItem = await Prefill.Instance.Items.find(x => x.Id === todoItemInput.Id);
    if (!item) return false;
    item.Title = todoItemInput.Title;
    item.Description = todoItemInput.Description;
    item.DueDate = todoItemInput.DueDate;
    const schema: ITodoSchema = this.CreateTodoSchema(item);
    this.dataAccess.Update(item.Id, schema);
    return true;
  }

  @Mutation(() => Boolean!)
  async Complete(@Arg("Id") id: string) : Promise<boolean> {
    const item: TodoItem = await Prefill.Instance.Items.find(x => x.Id === id);
    if (!item) return false;
    item.Completed = true;
    const schema: ITodoSchema = this.CreateTodoSchema(item);
    schema.Completed = item.Completed;
    this.dataAccess.Update(item.Id, schema);
    return true;
  }

  @Mutation(() => Boolean!)
  Remove(@Arg("Id") id: string): boolean {
    const index = Prefill.Instance.Items.findIndex(x => x.Id === id);
    if (!index || index < 0) {
      return false;
    }
    Prefill.Instance.Items.splice(index, 1);
    this.dataAccess.Remove(id);
    return true;
  }

  @Query(() => [TodoItem], { description: "Get items past their due date" })
  async OverdueTodoItems(): Promise<TodoItem[]> {
    const localCollection = new Array<TodoItem>();
    const testDate = new Date();
    await Prefill.Instance.Items.forEach(x => {
      if (x.DueDate < testDate) {
        localCollection.push(x);
      }
    });
    return localCollection;
  }

  @FieldResolver()
  DaysCreated(
    @Root() TodoItem: TodoItem
  ): number {
    // This is the equivalent instantiation to the method call.
    //const args: [Date, Date] = [new Date(), TodoItem.CreationDate];
    const value = this.GetDateDifference(...[new Date(), TodoItem.CreationDate]);

    if (value === 0) {
      return 0;
    }
    return Math.round(value / this.milliSecondsPerDay);
  }

  // Uses the Rest parameters Tuple types introduced in TypeScript 3
  // Note - the signature of this could have been private GetDateDifference(...args: [Date, Date]): number
  private GetDateDifference<T extends Date[]>(...args: T): number {
    return Math.round(args[0].valueOf() - args[1].valueOf());
  }
}
