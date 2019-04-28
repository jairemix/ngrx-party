import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerFormComponent } from './adventurer-form.component';

describe('AdventurerFormComponent', () => {
  let component: AdventurerFormComponent;
  let fixture: ComponentFixture<AdventurerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
