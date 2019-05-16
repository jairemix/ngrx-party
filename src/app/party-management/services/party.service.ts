import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { setProto } from 'src/app/utils/set-proto.decorator';
import { PersistedPartyState } from '../state/party.state';

// can this be made more generic??
@Injectable()
export class PartyService {

  @setProto('PARTY')
  private readonly _PARTY_KEY: string;

  getParty(): Observable<PersistedPartyState> {
    try {
      const result = JSON.parse(localStorage.getItem(this._PARTY_KEY));
      return of(result);
    } catch (e) {
      return throwError(e);
    }
  }

  setParty(party: PersistedPartyState): Observable<PersistedPartyState> {
    try {
      const stringified = JSON.stringify(party);
      localStorage.setItem(this._PARTY_KEY, stringified);
      return of(party);
    } catch (e) {
      return throwError(e);
    }
  }

}
