import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';

const CompaniesRoutes: Routes = [
    { path: '', component: CompaniesComponent },
    { path: 'detalhe/:id', loadChildren: () => import('../detail-company/detail-company.module').then(m => m.DetailCompanyModule)},
    { path: 'enderecos/:id', loadChildren: () => import('../address-company/address-company.module').then(m => m.AddressCompanyModule)},
];

@NgModule({
    imports: [RouterModule.forChild(CompaniesRoutes)],
    exports: [RouterModule]
  })
export class CompaniesRoutingModule {}