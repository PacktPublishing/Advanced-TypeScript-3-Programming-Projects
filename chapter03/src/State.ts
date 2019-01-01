import { StringOrNull } from './Types';

export interface IPersonState {
  FirstName: string,
  LastName: string,
  Address1: string,
  Address2: StringOrNull,
  Town: string,
  County: string,
  PhoneNumber: string;
  Postcode: string,
  DateOfBirth: StringOrNull,
  PersonId : string
}

export class PersonState implements IPersonState {
  public FirstName: string;
  public LastName: string;
  public Address1: string;
  public Address2:  StringOrNull;
  public Town: string;
  public County: string;
  public PersonId : string;
  public PhoneNumber: string;
  public Postcode: string;
  public DateOfBirth:  StringOrNull;
}
