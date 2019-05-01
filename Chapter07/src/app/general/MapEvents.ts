import { Guid } from "guid-typescript";
import { PinsModel } from './PinsModel';
import { MapGeocode } from './MapGeocode';
import { PinModelData } from './PinModel';
import { PointsOfInterestService, PoiPoint } from '../services/points-of-interest.service';

export class MapEvents {
    private readonly geocode: MapGeocode;
    private infoBox: Microsoft.Maps.Infobox;

    constructor(private map: Microsoft.Maps.Map, private pinsModel: PinsModel, private poi: PointsOfInterestService) {
      this.geocode = new MapGeocode(this.map);
       Microsoft.Maps.Events.addHandler(map, 'click', (e: any) => {
        this.AddPushPin(e);
      });
      Microsoft.Maps.Events.addHandler(map, 'viewchangeend', () => {
        const center = map.getCenter();
        this.poi.Search([center.latitude, center.longitude]).then(pointsOfInterest => {
          if (pointsOfInterest && pointsOfInterest.length > 0) {
            this.AddPoi(pointsOfInterest);
          }
        })
      });
      const subscription = this.pinsModel.Load().subscribe((data: PinModelData[]) => {
        data.forEach(pinData => {
          const pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(pinData.lat, pinData.long), {
              draggable: true
          });
          this.map.entities.push(pin);
          const handler = Microsoft.Maps.Events.addHandler(pin, 'click', () => {
            this.pinsModel.Remove(pinData.id);
            this.map.entities.remove(pin);
            Microsoft.Maps.Events.removeHandler(handler);
            Microsoft.Maps.Events.removeHandler(dragHandler);
          });
          const dragHandler = Microsoft.Maps.Events.addHandler(pin, 'dragend', (args: any) => {
            this.geocode.ReverseGeocode(args.location).then((geocode) => {
              this.pinsModel.Move(pinData.id, geocode, args.location.latitude, args.location.longitude);
              this.map.entities.push(pin);
              this.SetInfoBox('User location (Moved)', geocode, pin);
            });
          });
        });
        subscription.unsubscribe();
        this.pinsModel.AddFromStore(data);
      });
    }
    AddPoi(pois: PoiPoint[]) {
      pois.forEach(poi => {
        const pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(poi.lat, poi.long), {
          color: Microsoft.Maps.Color.fromHex('#00ff00')
        });
        this.map.entities.push(pin);
        Microsoft.Maps.Events.addHandler(pin, 'click', (x) => {
          this.SetInfoBox('Point of interest', poi.name, pin);
        });
      })
    }

    AddPushPin(e: any): void {
      const guid: Guid = Guid.create();
      const pin: Microsoft.Maps.Pushpin = new Microsoft.Maps.Pushpin(e.location, {
        draggable: true
      });
      this.geocode.ReverseGeocode(e.location).then((geocode) => {
        this.pinsModel.Add(guid.toString(), geocode, e.location.latitude, e.location.longitude);
        this.map.entities.push(pin);
        this.SetInfoBox('User location', geocode, pin);
      });

      // Pins can be dragged so track the drag end
      const dragHandler = Microsoft.Maps.Events.addHandler(pin, 'dragend', (args: any) => {
        this.geocode.ReverseGeocode(args.location).then((geocode) => {
          this.pinsModel.Move(guid.toString(), geocode, args.location.latitude, args.location.longitude);
          this.SetInfoBox('User location (Moved)', geocode, pin);
        });
      });
      
      const handler = Microsoft.Maps.Events.addHandler(pin, 'click', () => {
        this.pinsModel.Remove(guid.toString());
        this.map.entities.remove(pin);

        // Tidy up our stray event handlers.
        Microsoft.Maps.Events.removeHandler(handler);
        Microsoft.Maps.Events.removeHandler(dragHandler);
      });

    }

    private SetInfoBox(title: string, description: string, pin: Microsoft.Maps.Pushpin): void {
        if (!this.infoBox) {
            this.infoBox = new Microsoft.Maps.Infobox(pin.getLocation(), { title: title, description: description });
            this.infoBox.setMap(this.map);
        }
        this.infoBox.setOptions({
            title: title,
            description: description,
            location: pin.getLocation(),
            visible: true
        });
    }
}
