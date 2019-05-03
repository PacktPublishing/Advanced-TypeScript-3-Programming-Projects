import { IDatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export interface IAddress extends IDatabaseModelBase {
  Line1 : string,
  Line2 : string,
  Line3 : string,
  Line4 : string,
  PostalCode : string
}