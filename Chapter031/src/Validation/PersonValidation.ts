import { IPersonState } from 'src/State';
import { MinLengthValidator } from 'src/Validators/MinLengthValidator';
import { IValidation } from './IValidation';

export class PersonValidation implements IValidation {
  private readonly firstNameValidator : MinLengthValidator = new MinLengthValidator(1);
  private readonly lastNameValidator : MinLengthValidator = new MinLengthValidator(2);
  public Validate(state: IPersonState, errors: string[]): void {
    if (!this.firstNameValidator.IsValid(state.FirstName)) {
      errors.push("The first name is a minimum of 1 character");
    }
    if (!this.lastNameValidator.IsValid(state.FirstName)) {
      errors.push("The last name is a minimum of 2 characters");
    }
  }
}