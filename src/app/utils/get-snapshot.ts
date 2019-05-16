import { Observable } from 'rxjs';

/**
 * unwraps latest value from observable.
 * if observable does not have a latest value, returns `defaultValue` (or undefined if unspecified)
 */
export function getSnapshot<V, D = void>(obs$: Observable<V>, defaultValue?: D): V | D {
  let value: V | D = defaultValue;
  obs$.subscribe((v) => value = v).unsubscribe();
  return value;
}
