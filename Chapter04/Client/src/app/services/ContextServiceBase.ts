import { BehaviorSubject } from 'rxjs';
import { IPictureModel } from '../types';
export class ContextServiceBase {
  private source = new BehaviorSubject(null);
  constructor() { }
  context = this.source.asObservable();
  public add(image: IPictureModel): void {
    this.source.next(image);
  }
}
