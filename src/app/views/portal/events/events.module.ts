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
import { EventRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';

/**
 * Import's Form Component
 */
import { FilterEventsComponent } from 'src/app/components/filter-events/filter-events.component';
import { FilterLocationComponent } from 'src/app/components/filter-events/filter-location/filter-location.component';
import { FilterDateComponent } from 'src/app/components/filter-events/filter-date/filter-date.component';
import { FilterModalityComponent } from 'src/app/components/filter-events/filter-modality/filter-modality.component';

const templateComponent = [
];


@NgModule({
  declarations: [
    EventsComponent,
    templateComponent
  ],
  imports: [
    EventRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class EventsModule { }
