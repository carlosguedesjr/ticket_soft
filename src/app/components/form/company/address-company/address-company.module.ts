import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { InitFormsModules } from 'src/app/components/shared/initForms.module';
import { MaterialModule } from 'src/app/components/shared/material.module';
import { AddressCompanyRoutingModule } from './address-company-routing.module';
import { AddressCompanyComponent } from './address-company.component';

const templateComponent = [
    AddressCompanyComponent
];

@NgModule({
    declarations: [
        templateComponent
    ],
    imports: [
        AddressCompanyRoutingModule,
        InitFormsModules,
        MaterialModule,
        NgxMaskModule.forRoot()
    ]
})
export class AddressCompanyModule { }