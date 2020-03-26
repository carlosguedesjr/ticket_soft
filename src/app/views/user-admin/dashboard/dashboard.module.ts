import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

/**
 * Import's Shared Component
 */
import { MaterialModule } from '../../../components/shared/material.module';
import { InitFormsModules } from '../../../components/shared/initForms.module';

/**
 * Import's Routes
 */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

/**
 * Import's Form Component
 */
import { MiniRowComponent } from '../../../components/dashboard/mini-row/mini-row.component';
import { MediumRowComponent } from '../../../components/dashboard/medium-row/medium-row.component'
import { CountUpModule } from 'countup.js-angular2';

const templateComponent = [
  MiniRowComponent,
  MediumRowComponent
];

@NgModule({
  declarations: [
    DashboardComponent,
    templateComponent
  ],
  imports: [
    DashboardRoutingModule,
    InitFormsModules,
    MaterialModule,
    CountUpModule,
    NgxMaskModule.forRoot()
  ]
})
export class DashboardModule { }
