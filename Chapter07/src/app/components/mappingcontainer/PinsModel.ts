import { PinModel } from './PinModel';
export class PinsModel {
  private pins: PinModel[] = [];
  public Add(...args: [string, ...number[]]) {
    const pinModel: PinModel = new PinModel();
    pinModel.id = args[0];
    pinModel.lat = args[1];
    pinModel.long = args[2];
    this.pins.push(pinModel);
  }
  public Move(...args: [string, ...number[]]) {
    const pinModel: PinModel = this.pins.find(x => x.id === args[0]);
    if (pinModel) {
      pinModel.lat = args[1];
      pinModel.long = args[2];
    }
  }
}
