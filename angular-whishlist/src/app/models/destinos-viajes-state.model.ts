import {Injectable} from '@angular/core';
import {Action, State} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DestinoViaje} from './destino-viaje.model';

//ESTADO
export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorite: DestinoViaje;
}

export const inicializeDestinosViajesState = function(){
    return{
        items: [],
        loading: false,
        favorite: null
    };
};

//ACCIONES
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO ='[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO ='[Destinos Viajes] Favoritos',
    VOTE_UP ='[Destinos Viajes] Vote Up',
    VOTE_DOWN ='[Destinos Viajes] vote Down'
}

export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor (public destino: DestinoViaje){}
}

export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor (public destino: DestinoViaje){}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction;

//REDUCES
export function reducerDestinosViajes(
    state: DestinosViajesState,
    action: DestinosViajesActions
): DestinosViajesState {
    switch (action.type){
        case DestinosViajesActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            fav.setSelected(true);
            return{
                ...state,
                favorite: fav
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            state.items.forEach(x => x.setSelected(false));
            const d: DestinoViaje = (action as VoteUpAction).destino;
            d.voteUp();
            return{...state };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            state.items.forEach(x => x.setSelected(false));
            const d: DestinoViaje = (action as VoteDownAction).destino;
            d.voteDown();
            return{...state };
        }
    }
    return state;
}

//EFFECTS
@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private actions$: Actions){}
}
