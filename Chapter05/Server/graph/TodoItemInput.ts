import { Field, InputType, ID } from "type-graphql";
import { TodoItem } from "./TodoItem";

@InputType()
export class TodoItemInput implements Partial<TodoItem> {
  @Field()
  Title: string = "";
  @Field({ nullable: true })
  Description?: string = "";
  @Field({ nullable: true, description: "Woot" })
  DueDate?: Date;
  @Field()
  CreationDate: Date;
}
