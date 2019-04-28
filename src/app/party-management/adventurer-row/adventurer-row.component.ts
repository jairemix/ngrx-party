import { DeleteAdventurerAction, UpdateAdventurerAction } from './../actions/party.actions';
import { Store, select } from '@ngrx/store';
import { AdventurerClass } from './../../models/adventurer-class/adventurer-class.type';
import { Adventurer } from './../../models/adventurer/adventurer.type';
import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { map, reduce } from 'lodash-es';
import { getAdventurerClasses, getAdventurerClassDict } from '../state/adventurer-classes.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-adventurer-row',
  templateUrl: './adventurer-row.component.html',
  styleUrls: ['./adventurer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdventurerRowComponent implements OnChanges {

  @Input() adventurer: Adventurer;
  private classDict: Dictionary<AdventurerClass>;

  // derived values
  classes: AdventurerClass[];
  classString: string;
  health: number;

  // NOTE: should not get directly from store, should use container according to ngRx pattern
  constructor(private store: Store<any>) {
    this.store.pipe(
      select(getAdventurerClassDict),
      take(1)
    ).subscribe((classDict) => {
      this.classDict = classDict;
    });
  }

  ngOnChanges({ adventurer }: SimpleChanges) {
    const current = adventurer.currentValue as Adventurer;
    const prev = adventurer.previousValue as Adventurer;

    if (current.classes !== (prev && prev.classes)) { // assumes immutability
      this.classes = map(current.classes, id => this.classDict[id]);
      this.classString = map(this.classes, 'title').join(' | ');
    }

    this.calcStats();
  }

  private calcStats() {
    // average the health for all classes and round the result
    const level = this.adventurer.level;
    this.health = Math.round(reduce(this.classes, (total, adventurerClass) => {
      return total + adventurerClass.calculateHealth(level);
    }, 0) / this.classes.length);
  }

  levelUp() {
    this.store.dispatch(new UpdateAdventurerAction({
      ...this.adventurer,
      level: this.adventurer.level + 1,
    }));
  }

  deleteAdventurer() {
    this.store.dispatch(new DeleteAdventurerAction(this.adventurer));
  }

}
