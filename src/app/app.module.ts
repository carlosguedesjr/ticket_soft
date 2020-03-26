import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';

import { appRouting } from './app.routing';
import { RouterModule } from '@angular/router';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';


/**
 * Import's locale
 */
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePtBr);

/**
 * Import's Shared Component
 */
import { InitFormsModules } from 'src/app/components/shared/initForms.module';
import { MaterialModule } from './components/shared/material.module';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientJsonpModule,
  RouterModule,
  MaterialModule,
  InitFormsModules,
  LoadingSpinnerModule
];

/**
 * Services imports
 */
import { ReCaptchaService } from './services/ReCaptchaService.service';
import { ConfigService } from './services/Config.service';
import { NotificationService } from './services/Notification.service';
import { DataTableService } from './services/DataTable.service';
import { ObsDataTableService } from './services/ObsDataTable.service';
import { EventsService } from './services/Events.service';
import { EventService } from './services/Event.service';
import { CategoryEventsService } from './services/CategoryEvents.service';
import { CheckoutService } from './services/Checkout.service';
import { ValidateDocumentService } from './services/ValidateDocument.service';
import { LoaderService } from './services/Loader.service';
import { AddressService } from './services/Address.service';
import { slideShoppingCartService } from './services/slideShoppingCart.service';
import { ShoppingCartService } from './services/ShoppingCart.service';
import { NewsletterService } from './services/Newsletter.service';
import { RegisterUserService } from './services/registerUser.service';

/**
 * Translate pt_br mat-table and datepicker
 */
import { getPortuguesePaginatorIntl } from './services/pt-paginator-intl.service';
import { MatPaginatorIntl, MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentsMiniService } from './services/dashboard/DocumentsMini.service';
import { MapRowService } from './services/dashboard/MapRow.service';
import { MakeResponseService } from './helpers/make-response.services';
import { AuthComponent } from './components/auth/auth.component';

const services = [
  ReCaptchaService,
  ConfigService,
  AddressService,
  ShoppingCartService,
  FeaturedCardsServices,
  NewsletterService,
  NotificationService,
  DataTableService,
  ObsDataTableService,
  ValidateDocumentService,
  EventsService,
  EventService,
  DashboardService,
  CategoryEventsService,
  CheckoutService,
  LoaderService,
  DocumentsMiniService,
  MapRowService,
  slideShoppingCartService,
  MakeResponseService,
  RegisterUserService
];

/**
 * Import's Form Component
 */
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NewsletterComponent } from 'src/app/components/newsletter/newsletter.component';
import { SupportComponent } from 'src/app/components/support/support.component';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FeaturedCardsServices } from './services/FeaturedCards.service';
import { LoginBtnComponent } from './components/navbar/login-btn/login-btn.component';
import { PopoverLoginComponent } from './components/popover-login/popover-login.component';
import { PopoverProfileComponent } from './components/popover-profile/popover-profile.component';
import { ProfileBtnComponent } from './components/navbar/profile-btn/profile-btn.component';
import { LoginComponent } from './views/portal/access/login/login.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { NgxMaskModule } from 'ngx-mask';
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';
import { CartBtnComponent } from './components/navbar/cart-btn/cart-btn.component';
import { DashboardService } from './services/Dashboard.service';
import { AddressComponent } from './components/form/address/address.component';
import { ContactsComponent } from './components/form/contacts/contacts.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PhonesComponent } from './components/form/phones/phones.component';
import { MessagingComponent } from './components/messaging/messaging.component';


const templateComponent = [
  NavbarComponent,
  NewsletterComponent,
  SupportComponent,
  ShoppingCartComponent,
  FooterComponent,
  LoginBtnComponent,
  PopoverLoginComponent,
  LoginComponent,
  AuthComponent,
  PopoverProfileComponent,
  ProfileBtnComponent,
  ResponseResetComponent,

];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/lang/', '-lang.json');
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("459550401627736")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("1054869291834-acqe121odm9l5oj3j1bu9jkmb4rofdkh.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    templateComponent,
    CartBtnComponent,
    PhonesComponent,
    MessagingComponent,
  ],
  imports: [
    modules,
    appRouting,
    HttpClientModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('UserData');
        },
        whitelistedDomains: [
          'localhost:4200',
          'https://api-mktp-authentication.eptv.com.br',
          'https://www.receitaws.com.br/v1/cnpj'],
        blacklistedRoutes: [
          'http://localhost:3000/auth/login']
      }
    })
  ],
  providers: [
    services,
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: MatDialogRef },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  entryComponents: [
    AddressComponent,
    ContactsComponent,
    PhonesComponent,
    MessagingComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
