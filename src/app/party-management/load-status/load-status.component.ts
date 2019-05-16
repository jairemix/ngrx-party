import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AsyncState } from '../state/party.state';

@Component({
  selector: 'app-load-status',
  templateUrl: './load-status.component.html',
  styleUrls: ['./load-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadStatusComponent {

  @Input() loadState: AsyncState;

}
