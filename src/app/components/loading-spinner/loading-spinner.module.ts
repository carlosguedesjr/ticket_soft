import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MaterialModule } from 'src/app/components/shared/material.module';


@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    MaterialModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forChild()
  ],
  exports: [
      LoadingSpinnerComponent
  ]
})
export class LoadingSpinnerModule { }
