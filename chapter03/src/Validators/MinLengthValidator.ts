import { StringOrNull } from 'src/Types';

export class MinLengthValidator implements IValidator<StringOrNull> {
  private minLength : number;
  constructor(minLength : number) {
    this.minLength = minLength;
  }
  public IsValid(input : StringOrNull) : boolean {
    if (!input) {
      return false;
    }
    return input.length >= this.minLength;
  }
}