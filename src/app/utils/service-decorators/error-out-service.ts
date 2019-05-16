import { each } from 'lodash-es';
import { Dictionary } from '../dictionary.type';
import { Observable, throwError } from 'rxjs';

/**
 * causes some async functions on a service to error out by decorating the service
 */
export function errorOutService<
  F extends string,
  S extends Dictionary<(...args: any[]) => Observable<any>, F>,
>(
  errorDict: Dictionary<any, F>,
  service: S,
): S {
  each(errorDict, (error, field: F) => {
    service[field] = ((..._: any[]) => throwError(error)) as any;
  });
  return service;
}
