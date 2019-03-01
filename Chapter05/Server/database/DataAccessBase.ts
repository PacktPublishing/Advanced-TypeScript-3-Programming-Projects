import mongoose from "mongoose";
import { Model } from "./Database";
export class DataAccessBase<T extends mongoose.Document> {
  private model: Model;
  constructor(model: Model) {
    this.model = model;
  }
  GetAll(): Promise<T[]> {
    return new Promise<T[]>((callback, error) => {
      this.model.find((err: any, result: T[]) => {
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
      this.model.create(item, (err: any, result: T) => {
        if (err) {
          error(err);
        }
        callback(!result);
      });
    });
  }
  Get(id: string): Promise<T> {
    return new Promise<T>((callback, error) =>{
      this.model.find({'Id': id}, (err: any, result: T) => {
        if (err) {
          error(err);
        }
        callback(result);
      });
    });
  }
  Remove(id: string): Promise<void> {
    return new Promise<void>((callback, error) => {
      this.Get(id).then(x => {
        this.model.deleteOne({'Id': id}, (err: any) => {
          if (err) {
            error(err);
          }
          callback();
        });
      });
    });
  }
}
