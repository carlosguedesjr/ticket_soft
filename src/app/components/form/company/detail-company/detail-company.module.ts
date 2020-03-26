import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { InitFormsModules } from 'src/app/components/shared/initForms.module';
import { MaterialModule } from 'src/app/components/shared/material.module';
import { DetailCompanyRoutingModule } from './detail-company-routing.module';
import { DetailCompanyComponent } from './detail-company.component';

const templateComponent = [
    DetailCompanyComponent
];

@NgModule({
    declarations: [
        templateComponent
    ],
    imports: [
        DetailCompanyRoutingModule,
        InitFormsModules,
        MaterialModule,
        NgxMaskModule.forRoot()
    ]
})
export class DetailCompanyModule { }