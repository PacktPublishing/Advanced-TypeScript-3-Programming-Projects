import { IPersonState } from 'src/State';

export interface IValidation {
  Validate(state : IPersonState, errors : string[]) : void;
}