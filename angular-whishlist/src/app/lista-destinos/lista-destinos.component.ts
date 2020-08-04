import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import {DestinoApiClient } from './../models/destino-api-client.model';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app.module';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.model';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  update: string[];
  all;
  constructor(private destniApiClient: DestinoApiClient, private store : Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.update = [];
    this.store.select(state => state.destino.favorite)
      .subscribe(data => {
        if (data != null) {
          this.update.push('se ha elegido a '+data.nombre)
        }
    });
    store.select(state => state.destino.items).subscribe(items => this.all = items);
  }

  ngOnInit(){
  }

  agregado(d: DestinoViaje){
    this.destniApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido (d:DestinoViaje) {
    this.destniApiClient.elegir(d);
  }

  getAll(){

  }
}