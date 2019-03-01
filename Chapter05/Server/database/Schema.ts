import mongoose, { Schema } from "mongoose";

export interface ITodoSchema extends mongoose.Document {
  Id: string,
  Title: string,
  Description: string,
  DueDate: Date,
  CreationDate: Date,
  Completed: boolean,
}

export const TodoSchema = new Schema({
  Id: String,
  Title: String,
  Description: String,
  DueDate: Date,
  CreationDate: Date,
  Completed: Boolean,
});

export const TodoModel = mongoose.model<ITodoSchema>('todo', TodoSchema, 'todoitems', false);