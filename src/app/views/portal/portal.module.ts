import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

/**
 * Import's Shared Component
 */
import { MaterialModule } from '../../components/shared/material.module';
import { InitFormsModules } from '../../components/shared/initForms.module';

/**
 * Import's Routes
 */
import { PortalRoutingModule } from './portal-routing.module';

/**
 * Import's Portal Component
 */
import { PortalComponent } from './portal.component';

const structComponent = [
  PortalComponent
];


@NgModule({
  declarations: [
    structComponent
  ],
  imports: [
    PortalRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TranslateModule.forChild(),
  ]
})
export class PortalModule { }
