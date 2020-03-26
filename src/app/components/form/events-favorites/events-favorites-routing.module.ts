import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { EventsFavoritesComponent } from './events-favorites.component';

const dashboardRoutes: Routes = [
    { path: '', component: EventsFavoritesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })
export class EventsFavoritesdRoutingModule {}