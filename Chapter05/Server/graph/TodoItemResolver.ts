import "reflect-metadata";
import { ResolverInterface, Query, Mutation, Arg, FieldResolver, Root, Int } from "type-graphql";
import { Resolver } from "type-graphql";
import { TodoItem } from "./TodoItem";
import { todoSample } from "../apolloserver";
import { TodoItemInput } from "./TodoItemInput";

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
    console.log(`Here`);
    return await this.items;
  }

  @Mutation(returns => TodoItem)
  async Add(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<TodoItem> {
    console.log(`Adding the server side`);
    const todoItem = new TodoItem();
    todoItem.Id = todoItemInput.Id;
    todoItem.CreationDate = todoItemInput.CreationDate;
    todoItem.DueDate = todoItemInput.DueDate;
    todoItem.Description = todoItemInput.Description;
    todoItem.Title = todoItemInput.Title;
    console.log(`here I am ${todoItem.Title}`);
    await this.items.push(todoItem);
    console.log(todoItem.Title);
    return todoItem;
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
