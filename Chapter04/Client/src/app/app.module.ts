import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule,
  MatInputModule, MatCardModule } from '@angular/material';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageBodyComponent } from './components/page-body/page-body.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FileuploadComponent,
    PageBodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule, // Dialog support
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule, // Needed for two way databinding support. Before we [(ngModel)], we need this import
  ],
  providers: [],
  entryComponents: [
    FileuploadComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
