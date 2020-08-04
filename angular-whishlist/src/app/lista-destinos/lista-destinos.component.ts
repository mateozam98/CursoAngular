import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../../app/models/destino-viaje.model';
import { DestinosApiClient } from './../../app/models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  constructor(private destinoApiClient:DestinosApiClient,private store: Store<Appstate>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null){
          this.updates.push("Se ha elegido a " + d.nombre)
        }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
  	this.destinoApiClient.add(d);
    this.onItemAdded.emit(d);
    this.store.dispatch(new NuevoDestinoAction(d));
  }
  elegido(e: DestinoViaje){
    this.destinoApiClient.elegir(e);
    this.store.dispatch(new ElegidoFavoritoAction(e));
  }
}
