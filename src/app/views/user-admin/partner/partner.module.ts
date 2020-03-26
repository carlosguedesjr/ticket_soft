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
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';

/**
 * Import's Form Component
 */


const templateComponent = [

];


@NgModule({
  declarations: [
    PartnerComponent,
    templateComponent
  ],
  imports: [
    PartnerRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class PartnerModule { }
