import { Field, InputType, ID } from "type-graphql";
import { TodoItem } from "./TodoItem";

@InputType()
export class TodoItemInput implements Partial<TodoItem> {
  @Field()
  Id: string;
  @Field({description: "The item title"})
  Title: string = "";
  @Field({ nullable: true, description: "The item description" })
  Description?: string = "";
  @Field({ nullable: true, description: "The item due date" })
  DueDate?: Date;
  @Field()
  CreationDate: Date;
  @Field()
  Completed: boolean = false;
}
