import { PartyEffects } from './effects/party-effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartyManagementPageComponent } from './party-management-page/party-management-page.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { AdventurerFormComponent } from './adventurer-form/adventurer-form.component';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PartyService } from './services/party.service';
import { partyReducer } from './reducers/party.reducer';
import { adventurerClassesReducer } from './reducers/adventurer-classes.reducer';
import { delayService } from '../utils/service-decorators/delay-service';
import { LoadStatusComponent } from './load-status/load-status.component';
import { PersistStatusComponent } from './persist-status/persist-status.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { DelegatingDeactivateGuard } from '../utils/delegating-deactivate-guard';
import { errorOutService } from '../utils/service-decorators/error-out-service';

const routes: Route[] = [
  {
    path: '',
    component: PartyManagementPageComponent,
    canDeactivate: [DelegatingDeactivateGuard],
  },
  {
    path: 'second-page',
    component: SecondPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('adventurerClasses', adventurerClassesReducer),
    StoreModule.forFeature('party', partyReducer),
    EffectsModule.forFeature([PartyEffects]),
  ],
  declarations: [
    PartyManagementPageComponent,
    AdventurerRowComponent,
    AdventurerFormComponent,
    LoadStatusComponent,
    PersistStatusComponent,
    SecondPageComponent,
  ],
  providers: [

    /**
     * normal service
     */
    // {
    //   provide: PartyService,
    //   useClass: PartyService,
    // },

    /**
     * delayed party service
     */
    {
      provide: PartyService,
      deps: [],
      useFactory: () => delayService({ getParty: 1000, setParty: 1000 }, new PartyService()),
    },

    /**
     * delayed party service with error
     */
    // {
    //   provide: PartyService,
    //   deps: [],
    //   useFactory: () => {
    //     return delayService({ getParty: 1000, setParty: 1000 },
    //       errorOutService({ setParty: 'Test Error' }, new PartyService()),
    //     );
    //   },
    // }
  ],
  exports: [
  ],
})
export class PartyManagementModule {}
