/// <reference path='../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import { EventEmitter, Component, OnInit, ViewChild, Output } from '@angular/core';

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
      credentials: 'ApKBOGD6mTjyn0tcEXMozQwWz1m7hI6kl2mh74SWyPuzsfyQtc2_pUwYtshoBC1b',
      enableCORS: true,
      mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
      zoom: 12
    });

    this.map.emit(map);
    const mappingLayer = new Microsoft.Maps.Layer();
    mappingLayer.add(new Microsoft.Maps.Pushpin(map.getCenter()));
    Microsoft.Maps.Events.addHandler(mappingLayer, 'click', function(e) {
      var pin = new Microsoft.Maps.Pushpin(e.location , {
        title: 'Tests',
        subTitle: 'newPin',
        text: '2'
      })
      map.entities.push(pin);
    });


    //Create custom Pushpin
  }
}
