import { IDatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export enum Status {
  New,
  Pending,
  Closed
}
export interface ILead  extends IDatabaseModelBase {
  Name: string;
  Topic: string;
  Created: Date;
  Status: Status;
}