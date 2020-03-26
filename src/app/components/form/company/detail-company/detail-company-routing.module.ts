import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailCompanyComponent } from './detail-company.component';

const DetailCompanyRoutes: Routes = [
    { path: '', component: DetailCompanyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DetailCompanyRoutes)],
    exports: [RouterModule]
  })
export class DetailCompanyRoutingModule {}