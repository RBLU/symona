import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CockpitComponent }    from './cockpit/cockpit.component';
import {CockpitHomeComponent} from "./cockpit-home/cockpit-home.component";
import {RunDetailComponent} from "./run-detail/run-detail.component";

const heroesRoutes: Routes = [
  { path: 'cockpit',
    component: CockpitComponent,
    children: [
      {
        path: '',
        component: CockpitHomeComponent
      }, {
        path: ':boid',
        component: RunDetailComponent
      }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CockpitRoutingModule { }
