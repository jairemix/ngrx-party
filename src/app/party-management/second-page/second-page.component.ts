import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
