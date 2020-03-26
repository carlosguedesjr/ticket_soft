import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressCompanyComponent } from './address-company.component';

const AddressCompanyRoutes: Routes = [
    { path: '', component: AddressCompanyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(AddressCompanyRoutes)],
    exports: [RouterModule]
  })
export class AddressCompanyRoutingModule {}