import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule as NgRxStoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { from } from 'rxjs';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { DestinoApiClient} from './models/destinos-api-client.model';
import { formatCurrency } from '@angular/common';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import {DestinosViajesState, reducerDestinosViajes, inicializeDestinosViajesState, DestinosViajesEffects} from './models/destinos-viajes-state.model'
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino', component: DestinoDetalleComponent}
];
// redux init
export interface AppState {
  destino: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destino: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: inicializeDestinosViajesState()
}
// redux fin init
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    NgRxStoreModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 45,
      logOnly: environment.production,
    })
  ],
  providers: [
    DestinoApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }