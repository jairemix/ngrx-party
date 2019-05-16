import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * A Deactivate Guard that delegates the `canDeactivate` call to the relevant component
 */
@Injectable({
  providedIn: 'root',
})
export class DelegatingDeactivateGuard<C extends CanDeactivate<C>> implements CanDeactivate<C> {
  canDeactivate(component: C, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {
    return component.canDeactivate(component, currentRoute, currentState, nextState);
  }
}
