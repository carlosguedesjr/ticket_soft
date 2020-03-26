
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const portalRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'contato', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'eventos', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
    { path: 'checkout', loadChildren: () => import('./spcheckout/spcheckout.module').then(m => m.SpcheckoutModule) },
    { path: 'evento/:url', loadChildren: () => import('./event/event.module').then(m => m.EventModule) }
];

@NgModule({
    imports: [RouterModule.forChild(portalRoutes)],
    exports: [RouterModule]
})

export class PortalRoutingModule {}