import { nonPersistedKeys, defaultLoadedPartyState } from './../state/party.state';
import { Store } from '@ngrx/store';
import {
  loadParty,
  loadPartySuccess,
  loadPartyError,
  persistParty,
  persistPartySuccess,
  persistPartyError,
  createAdventurer,
  updateAdventurer,
  deleteAdventurer,
} from './../actions/party.actions';
import { PartyService } from './../services/party.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map as mapRx, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { omit } from 'lodash-es';
import { getPartyState } from '../selectors/party.selectors';

@Injectable()
export class PartyEffects {

  loadParty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadParty),
      mergeMap((_) => this.partyService.getParty().pipe(
        mapRx(party => {
          return loadPartySuccess({
            party: party || defaultLoadedPartyState,
          });
        }),
        catchError((e) => of(loadPartyError(e)))
      )),
    );
  });

  persistParty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(persistParty),
      withLatestFrom(this.store.select(getPartyState)),
      switchMap(([_, partyState]) => {
        // switchMap because we want to persist only the latest state
        const toPersist = omit(partyState, ...nonPersistedKeys);
        return this.partyService.setParty(toPersist).pipe(
          mapRx(__ => persistPartySuccess()),
          catchError((e) => of(persistPartyError(e))),
        );
      }),
    );
  });

  createAdventurer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createAdventurer),
      mapRx(() => persistParty()),
    );
  });

  updateAdventurer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAdventurer),
      mapRx(() => persistParty()),
    );
  });

  deleteAdventurer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteAdventurer),
      mapRx(() => persistParty()),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private partyService: PartyService,
  ) {}
}
