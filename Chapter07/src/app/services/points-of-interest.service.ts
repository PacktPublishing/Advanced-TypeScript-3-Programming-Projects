import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import {Subscription} from "rxjs";

export interface PoiPoint {
  lat: number,
  long: number,
  name: string
}

type location = [number, number];
@Injectable({
    providedIn: 'root'
})
export class PointsOfInterestService {

  constructor(private http: HttpClient) { }

  public Search(location: location): Promise<PoiPoint[]> {
    const endpoint = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=coffee&userLocation=${location[0]},${location[1]}&key=${environment.mapKey}`;
    return new Promise<PoiPoint[]>((callback) => {
      const subscription: Subscription = this.http.get(endpoint).pipe(map(PointsOfInterestService.MapData)).subscribe((x: any) => {
        const points: PoiPoint[] = [];
        if (x.resourceSets && x.resourceSets.length > 0 && x.resourceSets[0].resources) {
          x.resourceSets[0].resources.forEach(element => {
            if (element.geocodePoints && element.geocodePoints.length > 0) {
              const poi: PoiPoint = {
                lat: element.geocodePoints[0].coordinates[0],
                long: element.geocodePoints[0].coordinates[1],
                name: element.name
              };
              points.push(poi)
            }
          });
        }
        subscription.unsubscribe();
        callback(points);
      })
    });
  }

  private static MapData(data: Response) {
    return data || {};
  }
}
