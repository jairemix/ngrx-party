import { PartyState, nonPersistedKeys, defaultLoadedPartyState } from './../state/party.state';
import { Store } from '@ngrx/store';
import {
  PartyActionsEnum,
  LoadPartyAction,
  PersistPartyAction,
  PersistPartySuccessAction,
  PersistPartyErrorAction,
  LoadPartyErrorAction
} from './../actions/party.actions';
import { PartyService } from './../services/party.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map as mapRx, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadPartySuccessAction } from '../actions/party.actions';
import { omit } from 'lodash-es';
import { getPartyState } from '../selectors/party.selectors';

// new syntax -> createEffect

@Injectable()
export class PartyEffects {

  @Effect()
  loadParty$ = this.actions$.pipe(
    ofType(PartyActionsEnum.LoadParty),
    mergeMap((_: LoadPartyAction) => this.partyService.getParty().pipe(
      mapRx(party => {
        return new LoadPartySuccessAction(party ? {
          ...party,
          loadState: {
            done: true,
          },
          persistState: {
            done: true,
          },
        } : defaultLoadedPartyState);
      }),
      catchError((e) => of(new LoadPartyErrorAction(e)))
      // catchError(() => of(new LoadPartySuccessAction(defaultPartyState))),
    )),
  );

  @Effect()
  persistParty$ = this.actions$.pipe(
    ofType(PartyActionsEnum.PersistParty),
    withLatestFrom(this.store.select(getPartyState)),
    switchMap(([_, partyState]: [PersistPartyAction, PartyState]) => {
      // switchMap because we want to persist only the latest state
      const toPersist = omit(partyState, ...nonPersistedKeys);
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
