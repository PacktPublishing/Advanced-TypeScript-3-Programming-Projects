export class RegularExpressionValidator {
  private regex : RegExp;
  constructor(expression : string) {
    this.regex = new RegExp(expression);
  }
  public IsValid (input : string) : boolean {
    if (!input) {
      return false;
    }
    return this.regex.test(input);
  }  
}