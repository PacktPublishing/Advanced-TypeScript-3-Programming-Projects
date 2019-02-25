import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltasksComponent } from './components/alltasks/alltasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
