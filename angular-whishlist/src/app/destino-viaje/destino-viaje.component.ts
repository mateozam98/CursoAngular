import { Component, OnInit, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { VoteUpAction, VoteDownAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destinos: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass ='col-sm-4';
  @Output() onclicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>) {
    this.onclicked = new EventEmitter();
  }
         
  ngOnInit() {
  }

  ir(){
    this.onclicked.emit(this.destinos);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destinos));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destinos));
    return false;
  }

}