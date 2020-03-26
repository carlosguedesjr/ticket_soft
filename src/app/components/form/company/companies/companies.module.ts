import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { CompaniesRoutingModule } from './companies-routing.module';
import { InitFormsModules } from 'src/app/components/shared/initForms.module';
import { MaterialModule } from 'src/app/components/shared/material.module';
import { DetailCompanyComponent } from '../detail-company/detail-company.component';

const templateComponent = [
    
];

@NgModule({
    declarations: [
        templateComponent
    ],
    imports: [
        CompaniesRoutingModule,
        InitFormsModules,
        MaterialModule,
        NgxMaskModule.forRoot()
    ]
})
export class CompaniesModule { }