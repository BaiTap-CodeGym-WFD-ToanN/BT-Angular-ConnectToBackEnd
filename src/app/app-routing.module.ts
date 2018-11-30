import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RedirectorComponent} from './redirector/redirector.component';
import {TodoComponent} from './todo/todo.component';
import {BlogEditComponent} from './blog/blog-edit/blog-edit.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {BlogComponent} from './blog/blog/blog.component';

const routes: Routes = [
  {path: '', component: RedirectorComponent},
  {path: 'todo', component: TodoComponent}, {
    path: 'blog',
    component: BlogComponent
  }, {
    path: 'blog/:id',
    component: BlogDetailComponent
  }, {
    path: 'blog/:id/edit',
    component: BlogEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
