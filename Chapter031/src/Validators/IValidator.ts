interface IValidator<T> {
  IsValid(input : T) : boolean;
}