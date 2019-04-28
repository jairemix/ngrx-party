import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartyManagementPageComponent } from './party-management-page/party-management-page.component';
import { AdventurerRowComponent } from './adventurer-row/adventurer-row.component';
import { AdventurerFormComponent } from './adventurer-form/adventurer-form.component';
import { RouterModule, Route } from '@angular/router';

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
  ],
  declarations: [
    PartyManagementPageComponent,
    AdventurerRowComponent,
    AdventurerFormComponent,
  ],
  exports: [
  ],
})
export class PartyManagementModule {}
