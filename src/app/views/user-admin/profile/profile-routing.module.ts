import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { ProfileComponent } from './profile.component';

const profileRoutes: Routes = [
    { path: '', component: ProfileComponent },
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
  })
export class ProfileRoutingModule {}