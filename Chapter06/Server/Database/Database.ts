import mongoose, {mongo} from "mongoose";
import {SecuredDatabase} from "./Types";

export function Mongo(connection: string) {
  return function (constructor: Function) {
    mongoose.connect(connection, { useNewUrlParser: true}, (e:unknown) => {
      if (e) {
        console.log(`Unable to connect ` + e);
      } else {
        console.log(`Connected to the database`);
      }
    });
  }
}