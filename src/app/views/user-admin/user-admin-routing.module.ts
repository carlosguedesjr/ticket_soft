import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';

const adminRoutes: Routes = [
  { path: '', component: UserAdminComponent ,
      children: [
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'perfil', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
        { path: 'parceiros', loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule) },
        { path: 'eventosfavoritos', loadChildren: () => import('../../components/form/events-favorites/events-favorites.module').then(m => m.EventsFavoritesModule) },
        { path: 'eventosPassados', loadChildren: () => import('../../components/form/events-participated/events-participated.module').then(m => m.EventsParticipatedModule) },
        { path: 'empresas', loadChildren: () => import('../../components/form/company/companies/companies.module').then(m => m.CompaniesModule)},
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
  })
  export class UserAdminRoutingModule {}