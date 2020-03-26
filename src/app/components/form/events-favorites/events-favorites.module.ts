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

import { EventsFavoritesdRoutingModule } from './events-favorites-routing.module';

/**
 * Import's Form Component
 */

const templateComponent = [
   
];


@NgModule({
  declarations: [
    templateComponent
  ],
  imports: [
    EventsFavoritesdRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class EventsFavoritesModule { }
