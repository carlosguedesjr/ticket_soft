import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { EventsComponent } from './events.component';

const eventRoutes: Routes = [
    { path: '', component: EventsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(eventRoutes)],
    exports: [RouterModule]
  })
export class EventRoutingModule {}