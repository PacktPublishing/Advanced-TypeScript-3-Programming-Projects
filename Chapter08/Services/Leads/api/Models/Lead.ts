import { IDatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export interface ILead  extends IDatabaseModelBase {
  Name: string;
  Topic: string;
  Created: Date;
  Status: string;
}