import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Import Component
 */
import { HomeComponent } from 'src/app/views/portal/home/home.component';

const homeRoutes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
  })
export class HomeRoutingModule {}