export class UserCount {
  private _userCount: number = 0;

  public Joined(): void {
    this._userCount++;
  }

  public Left(): void {
    this._userCount--;
  }

  public get UserCount(): number {
    return this._userCount;
  }
}