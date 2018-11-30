import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import {RedirectorComponent} from './redirector/redirector.component';
import {BlogEditComponent} from './blog/blog-edit/blog-edit.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {BlogComponent} from './blog/blog/blog.component';
import {TokenInterceptor} from './blog/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    BlogComponent,
    BlogDetailComponent,
    BlogEditComponent,
    RedirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: 'TODO_API_URL', useValue: 'http://jsonplaceholder.typicode.com/todos'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
