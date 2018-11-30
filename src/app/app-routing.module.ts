import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RedirectorComponent} from './redirector/redirector.component';
import {TodoComponent} from './todo/todo.component';

const routes: Routes = [
  {path: '', component: RedirectorComponent},
  {path: 'todo', component: TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
