import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistStatusComponent } from './persist-status.component';

describe('PersistStatusComponent', () => {
  let component: PersistStatusComponent;
  let fixture: ComponentFixture<PersistStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersistStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
