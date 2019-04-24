/// <reference path='../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import { Component, OnInit } from '@angular/core';
import { MapEvents } from '../../general/MapEvents';
import { PinsModel } from '../../general/PinsModel';
import { FirebaseMapPinsService } from 'src/app/services/firebase-map-pins.service';
import { PointsOfInterestService } from 'src/app/services/points-of-interest.service';

@Component({
  selector: 'atp-mappingcontainer',
  templateUrl: './mappingcontainer.component.html',
  styleUrls: ['./mappingcontainer.component.scss']
})
export class MappingcontainerComponent implements OnInit {

  private map: Microsoft.Maps.Map;
  private mapEvents: MapEvents;
  constructor(private readonly firebaseMapPinService: FirebaseMapPinsService, private poi: PointsOfInterestService) { }

  ngOnInit() {
  }

  MapLoaded(map: Microsoft.Maps.Map) {
    this.map = map;
    this.mapEvents = new MapEvents(this.map, new PinsModel(this.firebaseMapPinService), this.poi);
  }
}
