import mongoose, {Schema} from "mongoose";
import {DataAccessBase} from "./DataAccessBase";

export enum LogLevel {
  Info,
  Error
}

export interface ILogSchema extends mongoose.Document {
  logLevel: LogLevel;
  LogMessage: string;
  Received: Date;
}

export const LogSchema = new Schema({
  logLevel: LogLevel,
  logMessage: String,
  received: Date
});

export const LogModel = mongoose.model<ILogSchema>('log', LogSchema, 'logs', false);

export class LogDataAccess extends DataAccessBase<ILogSchema> {
  constructor() {
    super(LogModel);
  }
}