import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    // other components
  ],
  imports: [
    BrowserModule,
    // other modules
  ],
  providers: [], // Providing the service here
  bootstrap: [AppComponent]
})
export class AppModule { }