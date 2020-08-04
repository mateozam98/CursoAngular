import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule as NgrxStoreModule, ActionReducerMap} from '@ngrx/store';
import { effectsModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { 
  DestinoViaje,
  reducersDestinosViajes,
  initializeDestinosViajesState,
  DestinosViajesEffects
} from './models/destinos-viajes-state.model';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent}
];

//redux init
export interface Appstate {
  destinos: DestinosViajeState;
}
const reducers: ActionReducerMap<Appstate> = {
  destinos: reducerDestinosViajes
};

let reducerInitialState = {
  destinos: initializeDestinosViajesState()
};
//redux fin init



@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgrxStoreModule.forRoot(reducers, {initialState: reducersinitialState}),
    EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
