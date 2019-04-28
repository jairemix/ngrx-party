import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyManagementComponent } from './party-management-page.component';

describe('PartyManagementComponent', () => {
  let component: PartyManagementComponent;
  let fixture: ComponentFixture<PartyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
