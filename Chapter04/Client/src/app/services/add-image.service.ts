import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddImageService {

  private source = new BehaviorSubject(null);
  constructor() { }

  context = this.source.asObservable();

  public add(image: FormData): void {
    this.source.next(image);
  }
}
