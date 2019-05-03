import { IDatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export interface IPerson extends IDatabaseModelBase {
  FirstName: string;
  LastName: string;
}