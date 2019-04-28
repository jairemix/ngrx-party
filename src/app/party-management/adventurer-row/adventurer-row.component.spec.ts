import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerRowComponent } from './adventurer-row.component';

describe('AdventurerRowComponent', () => {
  let component: AdventurerRowComponent;
  let fixture: ComponentFixture<AdventurerRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurerRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
