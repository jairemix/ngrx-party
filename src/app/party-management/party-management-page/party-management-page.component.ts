import { Dictionary } from './../../utils/dictionary.type';
import { LoadPartyAction, UpdateAdventurerAction, DeleteAdventurerAction, CreateAdventurerAction } from './../actions/party.actions';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Adventurer } from 'src/app/party-management/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { getAdventurers, getPersistState, getLoadState } from '../selectors/party.selectors';
import { getAdventurerClasses, getAdventurerClassDict } from '../selectors/adventurer-classes.selectors';
import { AsyncState } from '../state/party.state';
import { CanDeactivate } from '@angular/router';
import { take, map as mapRx } from 'rxjs/operators';
import { getSnapshot } from 'src/app/utils/get-snapshot';

@Component({
  selector: 'app-party-management-page',
  templateUrl: './party-management-page.component.html',
  styleUrls: ['./party-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementPageComponent implements OnInit, CanDeactivate<PartyManagementPageComponent> {

  readonly deactConfirmation = 'You have unsaved data. Are you sure you want to exit now?';

  adventurers$: Observable<Adventurer[]>;
  adventurerClasses$: Observable<AdventurerClass[]>;
  classDict$: Observable<Dictionary<AdventurerClass>>;
  loadState$: Observable<AsyncState>;
  persistState$: Observable<AsyncState>;

  constructor(private store: Store<any>) {
    this.loadState$ = this.store.pipe(select(getLoadState));
    this.persistState$ = this.store.pipe(select(getPersistState));
    this.adventurers$ = this.store.pipe(select(getAdventurers));
    this.adventurerClasses$ = this.store.pipe(select(getAdventurerClasses));
    this.classDict$ = this.store.pipe(select(getAdventurerClassDict));
  }

  ngOnInit() {
    this.store.dispatch(new LoadPartyAction());
  }

  levelUp(adventurer: Adventurer) {
    this.store.dispatch(new UpdateAdventurerAction({
      ...adventurer,
      level: adventurer.level + 1,
    }));
  }

  deleteAdventurer(adventurer: Adventurer) {
    this.store.dispatch(new DeleteAdventurerAction(adventurer));
  }

  createAdventurer(adventurer: Adventurer) {
    this.store.dispatch(new CreateAdventurerAction(adventurer));
  }

  canDeactivate() {
    return this._hasUnsavedData().pipe(
      mapRx((hasUnsavedData) => {
        if (!hasUnsavedData) {
          return true;
        }
        return window.confirm(this.deactConfirmation);
      }),
    );
  }

  private _hasUnsavedData() {
    return this.persistState$.pipe(
      take(1),
      mapRx((persistState) => !persistState.done)
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent) {
    const hasUnsavedData = getSnapshot(this._hasUnsavedData(), false);
    if (hasUnsavedData) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

}
