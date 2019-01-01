import { IPersonState } from 'src/State';
import { MinLengthValidator } from 'src/Validators/MinLengthValidator';
import { RegularExpressionValidator } from 'src/Validators/RegularExpressionValidator';
import { IValidation } from './IValidation';

export class PhoneValidation implements IValidation {

  private readonly regexValidator : RegularExpressionValidator;
  private readonly minLengthValidator : MinLengthValidator;
  constructor() {
    const validatorString = `^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$`;
    this.regexValidator = new RegularExpressionValidator(validatorString);
    this.minLengthValidator = new MinLengthValidator(1);
  }

  public Validate(state : IPersonState, errors : string[]) : void {
    if (!this.minLengthValidator.IsValid(state.PhoneNumber)) {
      errors.push("You must enter a phone number")
    } else if (!this.regexValidator.IsValid(state.PhoneNumber)) {
      errors.push("The phone number format is invalid");
    }
  }
}
