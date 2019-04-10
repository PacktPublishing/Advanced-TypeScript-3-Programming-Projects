/// <reference path='../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'atp-mappingcontainer',
    templateUrl: './mappingcontainer.component.html',
    styleUrls: ['./mappingcontainer.component.scss']
})
export class MappingcontainerComponent implements OnInit {

    private map: Microsoft.Maps.Map;
    constructor() { }

    ngOnInit() {
    }

    MapLoaded(map: Microsoft.Maps.Map) {
        this.map = map;
        const center = map.getCenter();
        console.log(`I have a map`);
        var pin = new Microsoft.Maps.Pushpin(center, {
            title: 'Microsoft',
            subTitle: 'City Center',
        });

        //Add the pushpin to the map
        map.entities.push(pin);
    }

}
