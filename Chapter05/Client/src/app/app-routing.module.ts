import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltasksComponent } from './components/alltasks/alltasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { OverduetasksComponent } from './components/overduetasks/overduetasks.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'all',
  pathMatch: 'full'
},
{
  path: 'all',
  component: AlltasksComponent
},
{
  path: 'add',
  component: AddTaskComponent
},
{
  path: 'overdue',
  component: OverduetasksComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
