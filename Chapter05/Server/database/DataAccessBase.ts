import mongoose from "mongoose";
import { Model } from "./Database";
export abstract class DataAccessBase<T extends mongoose.Document> {
  private model: Model;
  constructor(model: Model) {
    this.model = model;
  }
  GetAll(): Promise<T[]> {
    return new Promise<T[]>((callback, error) => {
      this.model.find((err: unknown, result: T[]) => {
        if (err) {
          error(err);
        }
        if (result) {
          callback(result);
        }
      });
    });
  }
  Add(item: T): Promise<boolean> {
    return new Promise<boolean>((callback, error) => {
      this.model.create(item, (err: unknown, result: T) => {
        if (err) {
          error(err);
        }
        callback(!result);
      });
    });
  }
  Get(id: string): Promise<T> {
    return new Promise<T>((callback, error) =>{
      this.model.find({'Id': id}, (err: unknown, result: T) => {
        if (err) {
          error(err);
        }
        callback(result);
      });
    });
  }
  Remove(id: string): Promise<void> {
    return new Promise<void>((callback, error) => {
      this.model.deleteOne({'Id': id}, (err: unknown) => {
        if (err) {
          error(err);
        }
        callback();
      });
    });
  }
  Update(id: string, item: T): Promise<boolean> {
    return new Promise<boolean>((callback, error) => {
      this.model.updateOne({'Id': id}, item, (err: unknown)=>{
        if (err) {
          error(err);
        }
        callback(true);
      });
    })
  }
}
