import { DatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export interface Person extends DatabaseModelBase {
  FirstName: string;
  LastName: string;
}