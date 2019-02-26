import "reflect-metadata";
import { ResolverInterface, Query, Mutation, Arg, FieldResolver, Root, Int } from "type-graphql";
import { Resolver } from "type-graphql";
import { TodoItem } from "./TodoItem";
import { todoSample } from "../apolloserver";
import { TodoItemInput } from "./TodoItemInput";
import { Guid } from "guid-typescript";
import { canNotDefineSchemaWithinExtensionMessage } from "graphql/validation/rules/LoneSchemaDefinition";

@Resolver(of => TodoItem)
export class TodoItemResolver implements ResolverInterface<TodoItem> {
  private readonly milliSecondsPerDay = 1000*60*60*24;
  private readonly items: TodoItem[] = todoSample();

  @Query(returns => TodoItem, { nullable: true })
  async TodoItem(@Arg("title") title: string): Promise<TodoItem | undefined> {
    return await this.items.find(todoItem => todoItem.Title === title);
  }

  @Query(returns => [TodoItem], { description: "Get all the TodoItems" })
  async TodoItems(): Promise<TodoItem[]> {
    return await this.items;
  }

  @Mutation(returns => TodoItem)
  async Add(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<TodoItem> {
    const todoItem = new TodoItem();
    todoItem.Id = Guid.create().toString();
    todoItem.CreationDate = todoItemInput.CreationDate;
    todoItem.DueDate = todoItemInput.DueDate;
    todoItem.Description = todoItemInput.Description;
    todoItem.Title = todoItemInput.Title;
    await this.items.push(todoItem);
    return todoItem;
  }

  @Mutation()
  Remove(@Arg("Id") id: string) : boolean {
    const index = this.items.findIndex(x => x.Id === id);
    if (!index || index < 0) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  @Query(returns => [TodoItem], { description: "Get items past their due date"})
  async OverdueTodoItems() : Promise<TodoItem[]> {
    let collection = this.items;
    if(collection) {
      collection = await collection.filter(x => x.DueDate && x.DueDate < new Date());
    }
    return collection;
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

  private GetDate(day: Date) : number {
    return Date.UTC(day.getFullYear(), day.getMonth(), day.getDay());
  }
}
