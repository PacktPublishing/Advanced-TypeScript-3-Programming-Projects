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
    const schema: ITodoSchema = <ITodoSchema>{
      Id: todoItem.Id,
      CreationDate: todoItem.CreationDate,
      DueDate: todoItem.DueDate,
      Description: todoItem.Description,
      Title:todoItem.Title,
      Completed: false
    }
    this.dataAccess.Add(schema);
    return todoItem;
  }

  @Mutation(() => Boolean!)
  async Update(@Arg("TodoItem") todoItemInput: TodoItemInput, @Arg("Id") id: string): Promise<boolean> {
    const item: TodoItem = await Prefill.Instance.Items.find(x => x.Id === id);
    if (!item) return false;
    item.Title = todoItemInput.Title;
    item.Description = todoItemInput.Description;
    item.DueDate = todoItemInput.DueDate;
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
    const today = new Date();
    const value = Math.round(this.GetDate(today) - this.GetDate(TodoItem.CreationDate));
    if (value === 0) {
      return 0;
    }
    return Math.round(value / this.milliSecondsPerDay);
  }

  private GetDate(day: Date): number {
    return Date.UTC(day.getFullYear(), day.getMonth(), day.getDay());
  }
}
