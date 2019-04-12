import { Guid } from "guid-typescript";
import { PinsModel } from './PinsModel';
import { MapGeocode } from './MapGeocode';

export class MapEvents {
  private readonly geocode: MapGeocode;
  constructor(private map: Microsoft.Maps.Map, private pinsModel: PinsModel) {
    this.geocode = new MapGeocode(this.map);
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
    this.geocode.GeoCode(e.location).then((geocode)=>{
      this.pinsModel.Add(guid.toString(), geocode, e.location.latitude, e.location.longitude);
      this.map.entities.push(pin);
    });

    // Pins can be dragged so track the drag end
    Microsoft.Maps.Events.addHandler(pin, 'dragend', (args:any) => {
      this.geocode.GeoCode(args.location).then((geocode)=>{
        this.pinsModel.Move(guid.toString(), geocode, args.location.latitude, args.location.longitude);
        this.map.entities.push(pin);
      });
    });
  }
}
