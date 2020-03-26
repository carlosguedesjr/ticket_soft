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
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

/**
 * Import's Form Component
 */

const templateComponent = [ ];


@NgModule({
  declarations: [
    ContactComponent,
    templateComponent
  ],
  imports: [
    ContactRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class ContactModule { }
