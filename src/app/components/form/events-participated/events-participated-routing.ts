import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsParticipatedComponent } from './events-participated.component';

const dashboardRoutes: Routes = [
    { path: '', component: EventsParticipatedComponent },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })
export class EventsParticipatedRoutingModule {}