/// <reference path='../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from 'src/environments/environment.prod';

@Component({
  selector: 'atp-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  host: {
    '(window:load)' : 'Loaded()'
  }
})
export class MapViewComponent implements OnInit {
  @ViewChild('myMap') myMap: { nativeElement: string | HTMLElement; };

  constructor() { }

  ngOnInit() {

  }

  @Output() map = new EventEmitter();

  Loaded() {
    // Bing has a nasty habit of not working properly in browsers like Chrome if we don't hook the map up 
    // in the window.load event.
    const map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: environment.mapKey,
      enableCORS: true,
      zoom: 13, mapTypeId:Microsoft.Maps.MapTypeId.road
    });

    this.map.emit(map);
  }
}
