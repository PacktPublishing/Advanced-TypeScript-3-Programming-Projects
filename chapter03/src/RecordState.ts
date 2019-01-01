export interface IRecordState {
  IsActive : boolean;
  SetActive(active : boolean) : void;
}

export class RecordState implements IRecordState {
  public IsActive: boolean;
  public SetActive(active: boolean): void {
        this.IsActive = active;
    }
}