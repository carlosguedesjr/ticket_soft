import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { PartnerComponent } from './partner.component';

const partnerdRoutes: Routes = [
    { path: '', component: PartnerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(partnerdRoutes)],
    exports: [RouterModule]
  })
export class PartnerRoutingModule {}