import { IPersonState } from 'src/State';
import { MinLengthValidator } from 'src/Validators/MinLengthValidator';
import { RegularExpressionValidator } from 'src/Validators/RegularExpressionValidator';
import { IValidation } from './IValidation';

export class AddressValidation implements IValidation {
  private readonly minLengthValidator : MinLengthValidator = new MinLengthValidator(5);
  private readonly zipCodeValidator : RegularExpressionValidator = new RegularExpressionValidator("^[0-9]{5}(?:-[0-9]{4})?$");
  public Validate(state: IPersonState, errors: string[]): void {
    if (!this.minLengthValidator.IsValid(state.Address1)) {
      errors.push("Address line 1 must be greater than 5 characters");
    }
    if (!this.minLengthValidator.IsValid(state.Town)) {
      errors.push("Town must be greater than 5 characters");
    }
    if (!this.minLengthValidator.IsValid(state.County)) {
      errors.push("County must be greater than 5 characters");
    }
    if (!this.zipCodeValidator.IsValid(state.Postcode)) {
      errors.push("The postal/zip code is invalid");
    }
  }
}
