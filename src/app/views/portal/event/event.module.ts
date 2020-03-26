import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../../../components/shared/material.module';
import { InitFormsModules } from '../../../components/shared/initForms.module';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';

@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        EventRoutingModule,
        InitFormsModules,
        MaterialModule,
        NgxMaskModule.forRoot()
    ]
})
export class EventModule { }