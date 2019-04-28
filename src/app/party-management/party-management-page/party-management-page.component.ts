import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Adventurer } from 'src/app/models/adventurer/adventurer.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-party-management-page',
  templateUrl: './party-management-page.component.html',
  styleUrls: ['./party-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyManagementPageComponent implements OnInit {

  constructor() {
    // console.log('adventurers$', this.store.select(state => state.party.adventurers));
  }

  ngOnInit() {
  }

}
