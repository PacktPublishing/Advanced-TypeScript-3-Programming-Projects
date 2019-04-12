import { Guid } from "guid-typescript";
import { PinsModel } from './PinsModel';

export class MapEvents {
  constructor(private map: Microsoft.Maps.Map, private pinsModel: PinsModel) {
    Microsoft.Maps.Events.addHandler(map, 'click', (e: any) => {
      this.AddPushPin(e);
    });
  }
  AddPushPin(e: any): void {
    const guid: Guid = Guid.create();
    const pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(e.location, {
      title: 'Tests',
      draggable: true
    });
    this.pinsModel.Add(guid.toString(), e.location.latitude, e.location.longitude);
    this.map.entities.push(pin);
    // Pins can be dragged so track the drag end
    Microsoft.Maps.Events.addHandler(pin, 'dragend', (args:any) => {
      this.pinsModel.Move(guid.toString(), args.location.latitude, args.location.longitude);
    });
  }
}
