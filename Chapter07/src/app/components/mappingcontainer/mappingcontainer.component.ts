/// <reference path='../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import { Component, OnInit } from '@angular/core';
import { MapEvents } from './MapEvents';
import { PinsModel } from './PinsModel';

@Component({
    selector: 'atp-mappingcontainer',
    templateUrl: './mappingcontainer.component.html',
    styleUrls: ['./mappingcontainer.component.scss']
})
export class MappingcontainerComponent implements OnInit {

    private map: Microsoft.Maps.Map;
    private mapEvents: MapEvents;
    constructor() { }

    ngOnInit() {
    }

    MapLoaded(map: Microsoft.Maps.Map) {
        this.map = map;
        this.mapEvents = new MapEvents(this.map, new PinsModel());
    }
}
