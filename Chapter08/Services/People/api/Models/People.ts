import { IAddress } from "../../../Addresses/api/Models/Addresses";
import { IDatabaseModelBase } from "../../../Common/Model/DatabaseModelBase";

export interface IPerson extends IDatabaseModelBase {
  FirstName: string;
  LastName: string;
  Address: IAddress;
}