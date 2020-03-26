import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { EventComponent } from '../event/event.component';

const eventRoutes: Routes = [
    { path: '', component: EventComponent },
    { path: 'evento/:url', component: EventComponent },
];

@NgModule({
    imports: [RouterModule.forChild(eventRoutes)],
    exports: [RouterModule]
  })
export class EventRoutingModule {}