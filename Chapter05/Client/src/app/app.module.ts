import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlltasksComponent } from './components/alltasks/alltasks.component';
import {MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatInputModule, MatCardModule, MatDatepickerModule } from '@angular/material';
 import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { OverduetasksComponent } from './components/overduetasks/overduetasks.component';

@NgModule({
  declarations: [
    AppComponent,
    AlltasksComponent,
    AddTaskComponent,
    TodoCardComponent,
    OverduetasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MatNativeDateModule, // This is needed to make the date picker work
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(httpLink: HttpLink, apollo: Apollo) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000' }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          // To get the data on each get, set the fetchPolicy
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}
