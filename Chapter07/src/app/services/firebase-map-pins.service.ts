import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PinModel, PinModelData } from '../general/PinModel';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMapPinsService {

  private pins: AngularFirestoreCollection<PinModelData>;
  public model: Observable<PinModelData[]>
  constructor(private readonly db: AngularFirestore) { 
    this.pins = db.collection<PinModelData>('pins');
    this.model = this.pins.valueChanges();
  }

  Save(item: PinModelData) {
    if (item.storageId === '') {
      item.storageId = this.db.createId();
      this.pins.doc(item.storageId).set(item);
    }
    else {
      this.pins.doc(item.storageId).update(item);
    }
  }

  Delete(item: PinModelData) {
    this.pins.doc(item.storageId).delete();
  }
}
