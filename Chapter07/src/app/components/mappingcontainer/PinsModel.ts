import { PinModel } from './PinModel';
export class PinsModel {
  private pins: PinModel[] = [];
  public Add(...args: [string, string, ...number[]]) {
    const pinModel: PinModel = new PinModel();
    pinModel.id = args[0];
    pinModel.name = args[1];
    pinModel.lat = args[2];
    pinModel.long = args[3];
    this.pins.push(pinModel);
    console.log(pinModel.name);
  }

  public Move(...args: [string,string, ...number[]]) {
    const pinModel: PinModel = this.pins.find(x => x.id === args[0]);
    if (pinModel) {
      pinModel.name = args[1];
      pinModel.lat = args[2];
      pinModel.long = args[3];
    }
    console.log(pinModel.name);
  }
}
