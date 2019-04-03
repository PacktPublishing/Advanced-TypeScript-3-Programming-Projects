import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OpenchatComponent} from "./components/openchat/openchat.component";

const routes: Routes = [{
  path: '',
  redirectTo: 'general',
  pathMatch: 'full'
}, {
  path: 'general',
  component: OpenchatComponent
}, {
  path: 'callback',
  component: OpenchatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
