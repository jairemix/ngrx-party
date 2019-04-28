import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';

// new syntax -> createEffect

@Injectable()
export class PartyEffects {

  // @Effect()
  // loadMovies$ = this.actions$.pipe(
  //   ofType('[Movies Page] Load Movies'),
  //   mergeMap(() => this.moviesService.getAll().pipe(
  //     map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //     catchError(() => EMPTY)
  //   )),
  // );

  constructor(
    private actions$: Actions,
    // private service: Service
  ) {}
}
