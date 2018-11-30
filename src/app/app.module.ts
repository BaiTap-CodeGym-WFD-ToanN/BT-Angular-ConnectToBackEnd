import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import { RedirectorComponent } from './redirector/redirector.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    RedirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: 'TODO_API_URL', useValue: 'http://jsonplaceholder.typicode.com/todos'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
