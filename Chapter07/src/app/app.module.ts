import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { MappingcontainerComponent } from './components/mappingcontainer/mappingcontainer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MappingcontainerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
