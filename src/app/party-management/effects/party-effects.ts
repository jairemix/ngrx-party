import { PartyStateModel } from './../state/party.state';
import { Store } from '@ngrx/store';
import {
  PartyActionsEnum,
  LoadPartyAction,
  PersistPartyAction,
  PersistPartySuccessAction,
  PersistPartyErrorAction
} from './../actions/party.actions';
import { PartyService } from './../services/party.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map as mapRx, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { defaultPartyStateModel, getPartyState } from '../state/party.state';
import { LoadPartySuccessAction } from '../actions/party.actions';
import { omit } from 'lodash-es';

// new syntax -> createEffect

@Injectable()
export class PartyEffects {

  @Effect()
  loadParty$ = this.actions$.pipe(
    ofType(PartyActionsEnum.LoadParty),
    mergeMap((_: LoadPartyAction) => this.partyService.getParty().pipe(
      mapRx(party => new LoadPartySuccessAction(party || defaultPartyStateModel)),
      catchError(() => of(new LoadPartySuccessAction(defaultPartyStateModel))),
    )),
  );

  @Effect()
  persistParty$ = this.actions$.pipe(
    ofType(PartyActionsEnum.PersistParty),
    withLatestFrom(this.store.select(getPartyState)),
    switchMap(([_, partyStateModel]: [PersistPartyAction, PartyStateModel]) => {
      // switchMap because we want to persist only the latest state
      const toPersist = omit(partyStateModel, 'loaded', 'loadError', 'persistError');
      return this.partyService.setParty(toPersist).pipe(
        mapRx(__ => new PersistPartySuccessAction()),
        catchError((e) => of(new PersistPartyErrorAction(e))),
      );
    }),
  );

  @Effect()
  createAdventurer$ = this.actions$.pipe(
    ofType(PartyActionsEnum.CreateAdventurer),
    mapRx(() => new PersistPartyAction()),
  );

  @Effect()
  updateAdventurer$ = this.actions$.pipe(
    ofType(PartyActionsEnum.UpdateAdventurer),
    mapRx(() => new PersistPartyAction()),
  );

  @Effect()
  deleteAdventurer$ = this.actions$.pipe(
    ofType(PartyActionsEnum.DeleteAdventurer),
    mapRx(() => new PersistPartyAction()),
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private partyService: PartyService,
  ) {}
}
