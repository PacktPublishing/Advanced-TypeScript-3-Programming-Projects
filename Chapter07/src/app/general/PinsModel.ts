import { PinModel, PinModelData } from './PinModel';
import { FirebaseMapPinsService } from '../services/firebase-map-pins.service';
import { Observable } from 'rxjs';
export class PinsModel {
  private pins: PinModelData[] = [];
  constructor(private firebaseMapService: FirebaseMapPinsService) {

  }

  public Load(): Observable<PinModelData[]>{
    return this.firebaseMapService.model;
  }

  public AddFromStore(pinModel: PinModelData[]) {
    this.pins = pinModel;
  }
  public Add(...args: [string, string, ...number[]]) {
    const data: PinModelData = {
      id: args[0],
      name: args[1],
      lat: args[2],
      long: args[3],
      storageId: ''
    };
    this.firebaseMapService.Save(data);
    this.pins.push(data);
  }

  public Move(...args: [string,string, ...number[]]) {
    const pinModel: PinModelData = this.pins.find(x => x.id === args[0]);
    if (pinModel) {
      pinModel.name = args[1];
      pinModel.lat = args[2];
      pinModel.long = args[3];
    }
    this.firebaseMapService.Save(pinModel);
  }

  public Remove(id: string) {
    const pinModel: PinModelData = this.pins.find(x => x.id === id);
    this.firebaseMapService.Delete(pinModel);
    const index: number = this.pins.findIndex(x => x.id === id);
    if (index >= 0) {
      this.pins.splice(index,1);
    }
  }
}
