import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { CardsComponent } from '../form/cards/cards.component';
import { MaterialModule } from './material.module';
import { RegisterUserComponent } from '../form/register-user/register-user.component';
import { AddressComponent } from '../form/address/address.component';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileCostumerCheckoutComponent } from '../form/profile-costumer-checkout/profile-costumer-checkout.component';
import { UserComponent } from '../form/user/user.component';
import { ButtonComponent } from '../form/button/button.component';
import { ProfileInformationComponent } from '../form/profile-information/profile-information.component';
import { ProfileUserComponent } from '../form/profile-user/profile-user.component';
import { ContactsComponent } from '../form/contacts/contacts.component';
import { EventsFavoritesComponent } from '../form/events-favorites/events-favorites.component';
import { EventsParticipatedComponent } from '../form/events-participated/events-participated.component';
import { FilterEventsComponent } from '../filter-events/filter-events.component';
import { FilterLocationComponent } from '../filter-events/filter-location/filter-location.component';
import { FilterModalityComponent } from '../filter-events/filter-modality/filter-modality.component';
import { FilterDateComponent } from '../filter-events/filter-date/filter-date.component';
import { CompaniesComponent } from '../form/company/companies/companies.component';
import { CompanyComponent } from '../form/profile-company/profile-company.component';

const components = [
    CardsComponent,
    RegisterUserComponent,
    ProfileInformationComponent,
    ButtonComponent,
    UserComponent,
    AddressComponent,
    ProfileCostumerCheckoutComponent,
    ProfileUserComponent,
    ContactsComponent,
    EventsFavoritesComponent, 
    EventsParticipatedComponent,
    CompaniesComponent,
    FilterEventsComponent,
    FilterLocationComponent,
    FilterModalityComponent,
    FilterDateComponent
]

@NgModule({
    declarations: [
        components
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MomentModule,
        FlexLayoutModule,
        MaterialModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MomentModule,
        FlexLayoutModule,
        components
    ]
})

export class InitFormsModules { }
