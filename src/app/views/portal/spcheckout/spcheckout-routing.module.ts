import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { SpcheckoutComponent } from './spcheckout.component';

const spcheckoutRoutes: Routes = [
    { path: '', component: SpcheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forChild(spcheckoutRoutes)],
    exports: [RouterModule]
  })
export class SpcheckoutRoutingModule {} 