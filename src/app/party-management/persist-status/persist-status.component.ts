import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AsyncState } from '../state/party.state';

@Component({
  selector: 'app-persist-status',
  templateUrl: './persist-status.component.html',
  styleUrls: ['./persist-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersistStatusComponent {

  @Input() persistState: AsyncState;

}
