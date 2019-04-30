import { PartyEffects } from './effects/party-effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartyManagementPageComponent } from './party-management-page/party-management-page.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { AdventurerFormComponent } from './adventurer-form/adventurer-form.component';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { adventurerClassesReducer } from './state/adventurer-classes.state';
import { partyReducer } from './state/party.state';
import { EffectsModule } from '@ngrx/effects';
import { PartyService } from './services/party.service';

const routes: Route[] = [
  {
    path: '',
    component: PartyManagementPageComponent,
  }
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
  ],
  providers: [
    PartyService,
  ],
  exports: [
  ],
})
export class PartyManagementModule {}
