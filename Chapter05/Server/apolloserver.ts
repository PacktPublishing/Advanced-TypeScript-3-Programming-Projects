// Very important - reflect metadata needs to be at the top of the stack of imports
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { Guid } from "guid-typescript";


import { TodoItem } from "./graph/TodoItem";
import { TodoItemResolver } from "./graph/TodoItemResolver";

export function todoSample(): TodoItem[] {
  const items : TodoItem[] = new Array<TodoItem>();
  let item: TodoItem = new TodoItem();
  item.Id = Guid.create().toString();
  item.Description = "hhhh";
  item.Title = "Peter 1";
  item.CreationDate = new Date();
  item.DueDate = new Date();
  items.push(item);
  item = new TodoItem();
  item.Id = Guid.create().toString();
  item.Description = "hhhh";
  item.Title = "Peter 2";
  item.CreationDate = new Date();
  item.DueDate = new Date();
  items.push(item);
  return items;
}

export class MyApp {

 public async Start(): Promise<void> {
   const schema = await buildSchema({
     resolvers: [TodoItemResolver],
     emitSchemaFile: path.resolve(__dirname, 'apolloschema.gql')
   });

   const server = new ApolloServer({schema, playground: true});
   const url = await server.listen(3000);
   console.log('Started')
 }
}

new MyApp().Start();