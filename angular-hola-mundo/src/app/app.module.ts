import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SaludadorComponent } from './saludador/saludador.component';
import { DestinosApiClient } from './saludador/destinos-api-client.model/destinos-api-client.model.component';
import { App } from './saludador/app.model/app.model.component';

@NgModule({
  declarations: [
    AppComponent,
    SaludadorComponent,
    DestinosApiClient.ModelComponent,
    App.ModelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
