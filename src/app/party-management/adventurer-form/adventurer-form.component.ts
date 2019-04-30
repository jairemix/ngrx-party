import { CreateAdventurerAction } from './../actions/party.actions';
import { getAdventurerClasses } from './../state/adventurer-classes.state';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { mapValues } from 'lodash-es';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { AdventurerClass } from 'src/app/party-management/models/adventurer-class/adventurer-class.type';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

interface AdventurerFormData {
  name: string;
  level: number;
  class: string;
}

@Component({
  selector: 'app-adventurer-form',
  templateUrl: './adventurer-form.component.html',
  styleUrls: ['./adventurer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventurerFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  formControls: Dictionary<AbstractControl>;
  defaults: AdventurerFormData;

  adventurerClasses$: Observable<AdventurerClass[]>;
  adventurerClasses: AdventurerClass[] = [];

  private destroyed$ = new Subject<void>();

  // NOTE: should not get directly from store, should use container according to ngRx pattern
  constructor(private store: Store<any>) {

    this.adventurerClasses$ = this.store.pipe(select(getAdventurerClasses));

    this.adventurerClasses$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe((a) => this.adventurerClasses = a);

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      class: new FormControl(this.adventurerClasses[0] && this.adventurerClasses[0].id, [Validators.required]),
      level: new FormControl(1, [Validators.required]),
    });
    this.formControls = this.formGroup.controls;
    this.defaults = mapValues(this.formControls, 'value') as any;
  }

  ngOnInit() {
  }

  createAdventurer() {
    if (!this.formGroup.valid) {
      alert('invalid');
      return;
    }
    const formData = this.formGroup.value as AdventurerFormData;
    this.store.dispatch(new CreateAdventurerAction({
      name: formData.name,
      classes: [formData.class],
      level: formData.level,
      id: null,
    }));
  }

  clear() {
    this.formGroup.reset();
    this.formGroup.setValue(this.defaults);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
