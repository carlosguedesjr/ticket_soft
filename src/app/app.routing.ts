import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './views/portal/access/login/login.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { RegisterUserComponent } from './components/form/register-user/register-user.component';

const rootRoutes: Routes = [
    { path: '', loadChildren: () => import('src/app/views/portal/portal.module').then(m => m.PortalModule) },
    { path: 'admin', loadChildren: () => import('src/app/views/user-admin/user-admin.module').then(m => m.UserAdminModule)},
    { path: 'cadastro', component: RegisterUserComponent},
    { path: 'login', component: LoginComponent},
    { path: 'login/:token', component: ResponseResetComponent },
];

@NgModule({
    imports: [
      RouterModule.forRoot(rootRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
export class appRouting {}

