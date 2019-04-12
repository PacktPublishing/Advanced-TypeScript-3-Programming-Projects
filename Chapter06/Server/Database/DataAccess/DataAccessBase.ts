import * as mongoose from "mongoose";
import {Model} from "../Types";

export abstract class DataAccessBase<T extends mongoose.Document>{
  private model: Model;
  protected constructor(model: Model) {
    this.model = model;
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

  GetAll(conditions: unknown, fields: unknown): Promise<unknown[]> {
    return new Promise<T[]>((callback, error) => {
      this.model.find(conditions, fields, (err: unknown, result: T[]) => {
        if (err) {
          error(err);
        }
        if (result) {
          callback(result);
        }
      });
    });
  }
}