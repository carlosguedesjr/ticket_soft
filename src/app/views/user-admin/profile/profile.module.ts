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
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

/**
 * Import's Form Component
 */

const templateComponent = [
];


@NgModule({
  declarations: [
    ProfileComponent,
    templateComponent
  ],
  imports: [
    ProfileRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProfileModule { }
