import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

/**
 * Import's Shared Component
 */
import { MaterialModule } from '../../../components/shared/material.module';
import { InitFormsModules } from '../../../components/shared/initForms.module';

/**
 * Import's Routes
 */
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

/**
 * Import's Form Component
 */
import { FeaturedCardsComponent } from 'src/app/components/form/featured-cards/featured-cards.component';
import { CategoriesComponent } from 'src/app/components/form/categories/categories.component';

const templateComponent = [
  CategoriesComponent,
  FeaturedCardsComponent,
];


@NgModule({
  declarations: [
    HomeComponent,
    templateComponent
  ],
  imports: [
    HomeRoutingModule,
    InitFormsModules,
    MaterialModule,
    SweetAlert2Module,
    NgxMaskModule.forRoot(),
  ]
})
export class HomeModule { }
