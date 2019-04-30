import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { map, reduce } from 'lodash-es';

@Component({
  selector: 'app-adventurer-row',
  templateUrl: './adventurer-row.component.html',
  styleUrls: ['./adventurer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdventurerRowComponent implements OnChanges {

  @Input() adventurer: Adventurer;
  @Input() classDict: Dictionary<AdventurerClass>;
  @Output() levelUp = new EventEmitter();
  @Output() deleteAdventurer = new EventEmitter();

  // derived values
  classes: AdventurerClass[];
  classString: string;
  health: number;

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

}
