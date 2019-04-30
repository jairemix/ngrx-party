import { Dictionary } from './../../utils/dictionary.type';
import { LoadPartyAction, UpdateAdventurerAction, DeleteAdventurerAction, CreateAdventurerAction } from './../actions/party.actions';
import { getAdventurers } from './../state/party.state';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Adventurer } from 'src/app/party-management/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';
import { getAdventurerClassDict, getAdventurerClasses } from '../state/adventurer-classes.state';
import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';

@Component({
  selector: 'app-party-management-page',
  templateUrl: './party-management-page.component.html',
  styleUrls: ['./party-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementPageComponent implements OnInit {

  adventurers$: Observable<Adventurer[]>;
  adventurerClasses$: Observable<AdventurerClass[]>;
  classDict$: Observable<Dictionary<AdventurerClass>>;

  constructor(private store: Store<any>) {
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

}
