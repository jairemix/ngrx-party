import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { mapValues } from 'lodash-es';
import { Dictionary } from 'src/app/utils/dictionary.type';
import { AdventurerClass } from 'src/app/party-management/models/adventurer-class/adventurer-class.type';
import { Adventurer } from '../models/adventurer/adventurer.type';

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
export class AdventurerFormComponent implements OnInit {

  formGroup: FormGroup;
  formControls: Dictionary<AbstractControl>;
  defaults: AdventurerFormData;

  @Input() adventurerClasses: AdventurerClass[];
  @Output() shouldSubmit = new EventEmitter<Adventurer>();

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      class: new FormControl(this.adventurerClasses[0] && this.adventurerClasses[0].id, [Validators.required]),
      level: new FormControl(1, [Validators.required]),
    });
    this.formControls = this.formGroup.controls;
    this.defaults = mapValues(this.formControls, 'value') as any;
  }

  submit() {
    if (!this.formGroup.valid) {
      alert('invalid');
      return;
    }
    const formData = this.formGroup.value as AdventurerFormData;
    this.shouldSubmit.emit({
      name: formData.name,
      classes: [formData.class],
      level: formData.level,
      id: null,
    });
    this.clear();
  }

  clear() {
    this.formGroup.reset();
    this.formGroup.setValue(this.defaults);
  }

}
