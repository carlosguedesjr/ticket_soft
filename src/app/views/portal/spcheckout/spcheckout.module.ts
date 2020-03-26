import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

/**
 * Import's Shared Component
 */
import { MaterialModule } from '../../../components/shared/material.module';
import { InitFormsModules } from '../../../components/shared/initForms.module';

/**
 * Import's Routes
 */
import { SpcheckoutRoutingModule } from './spcheckout-routing.module';
import { SpcheckoutComponent } from './spcheckout.component';

/**
 * Import's Form Component
 */
import { CheckoutComponent } from '../../../components/checkout/checkout.component';
import { CheckoutStepOneComponent } from '../../../components/checkout/checkout-step-one/checkout-step-one.component';
import { CheckoutStepTwoComponent } from '../../../components/checkout/checkout-step-two/checkout-step-two.component';
import { CheckoutStepThreeComponent } from 'src/app/components/checkout/checkout-step-three/checkout-step-three.component';


const checkoutComponent = [
  CheckoutComponent,
  CheckoutStepOneComponent,
  CheckoutStepTwoComponent,
  CheckoutStepThreeComponent,
  CheckoutStepFourComponent
];

/**
 * Template component's
 */
import { CheckoutMatSelectDinamycComponent } from 'src/app/components/checkout/checkout-mat-select-dinamyc/checkout-mat-select-dinamyc.component';
import { CheckoutDynamicAttributesComponent } from './../../../components/checkout/checkout-dynamic-attributes/checkout-dynamic-attributes.component';
import { CheckoutDynamicProductsComponent } from './../../../components/checkout/checkout-dynamic-products/checkout-dynamic-products.component';
import { CheckoutDynamicOptionalProductsComponent } from './../../../components/checkout/checkout-dynamic-optional-products/checkout-dynamic-optional-products.component';
import { CheckoutDynamicAttributesProductComponent } from './../../../components/checkout/checkout-dynamic-attributes-product/checkout-dynamic-attributes-product.component';
import { CheckoutMatCheckedDynamicComponent } from './../../../components/checkout/checkout-mat-checked-dynamic/checkout-mat-checked-dynamic.component';

const templateComponents = [
  CheckoutMatSelectDinamycComponent,
  CheckoutDynamicAttributesComponent,
  CheckoutDynamicProductsComponent,
  CheckoutDynamicOptionalProductsComponent,
  CheckoutDynamicAttributesProductComponent,
  CheckoutMatCheckedDynamicComponent
];

/** Import's Contact Component */

const contactComponents = [

];

/** Import's Profile Component */
import { LoadingSpinnerModule } from 'src/app/components/loading-spinner/loading-spinner.module';
import { CheckoutStepFourComponent } from 'src/app/components/checkout/checkout-step-four/checkout-step-four.component';

const profileComponents = [
];


@NgModule({
  declarations: [
    SpcheckoutComponent,
    checkoutComponent,
    contactComponents,
    profileComponents,
    templateComponents,

  ],
  imports: [
    LoadingSpinnerModule,
    SpcheckoutRoutingModule,
    InitFormsModules,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class SpcheckoutModule { }
