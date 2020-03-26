import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../../shared/material.module';
import { InitFormsModules } from '../../shared/initForms.module';
import { EventsParticipatedRoutingModule } from './events-participated-routing';

const templateComponent = [
];

@NgModule({
    declarations: [
        templateComponent
    ],
    imports: [
        EventsParticipatedRoutingModule,
        InitFormsModules,
        MaterialModule,
        NgxMaskModule.forRoot()
    ]
})
export class EventsParticipatedModule { }