import { each } from 'lodash-es';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Dictionary } from '../dictionary.type';

/**
 * adds a delay to some async functions on a service by decorating the service
 */
export function delayService<
  F extends string,
  S extends Dictionary<(...args: any[]) => Observable<any>, F>,
>(
  delayDict: Dictionary<number, F>,
  service: S,
): S {
  each(delayDict, (delay, field: F) => {
    const originalFn = service[field];
    service[field] = function(...args: any[]) {
      return timer(delay).pipe(
        switchMap(() => originalFn.apply(this, args)),
      );
    } as S[F];
  });
  return service;
}
