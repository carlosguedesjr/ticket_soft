import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

/**
 * Import's Shared Component
 */
import { MaterialModule } from '../../components/shared/material.module';
import { InitFormsModules } from '../../components/shared/initForms.module';

/**
 * Import's Routes
 */
import { UserAdminRoutingModule } from './user-admin-routing.module';

/**
 * Import's Form Component
 */
import { UserAdminComponent } from 'src/app/views/user-admin/user-admin.component';

const structComponent = [
  UserAdminComponent
];


@NgModule({
  declarations: [
    structComponent
  ],
  imports: [
    UserAdminRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot(),
  ]
})
export class UserAdminModule { }
