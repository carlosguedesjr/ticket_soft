import { Component, OnInit } from '@angular/core';
import { ProfileUserService } from 'src/app/services/ProfileUser.service';
import { Address } from 'src/app/interfaces/address';
import { CheckoutService } from 'src/app/services/Checkout.service';
import { AddressComponent } from '../address/address.component';
import { MatDialog } from '@angular/material';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ContactService } from 'src/app/services/Contact.service';
import { AddressService } from 'src/app/services/Address.service';
import { PhonesComponent } from '../phones/phones.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  login: any;
  imageProfile: string;
  userInformation: any;
  genders: any;
  addresses: Address[];
  updAddress: any;
  phonesClient: any;
  Swal = (Swal as any);
  userContacts: any;
  phoneSelect: any;


  constructor(private profileUserService: ProfileUserService
    , private addressService: AddressService
    , private checkoutService: CheckoutService
    , public dialog: MatDialog
    , public contactService: ContactService) { }

  ngOnInit() {
    this.start();
  }


  start() {
    this.profileUserService.getUserInformation().subscribe(data => {
      console.log("USERINF", data);
      this.userInformation = data;
      this.addresses = data['tbClienteCadastroEndereco'] ? data['tbClienteCadastroEndereco'] : null;
      this.phonesClient = data['tbClienteCadastroTelefone'] ? data['tbClienteCadastroTelefone'] : null;
    })
  }

  getUserWithAddresses() {
    this.checkoutService.getAddressesByUser()
      .subscribe(data => {
        this.addresses = data;
        let response = JSON.parse(JSON.stringify(data));
        response.map((el: any) => {
          this.userInformation = el;
        });
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressComponent, {
      width: '800px',
      data: { "address": this.updAddress }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogPhone(): void {
    const dialogRef = this.dialog.open(PhonesComponent, {
      width: '800px',
      data: { "phone": this.phoneSelect }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addPhone() {
    this.phoneSelect = null;
    this.openDialogPhone();
  }
  editPhone(phoneClint) {
    this.phoneSelect = phoneClint;
    this.openDialogPhone();
  }

  removeUserContact(contact) {
    this.Swal.fire({
      title: 'Deseja excluir esse registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      showCancelButtonTesxt: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exluir!'
    }).then((result) => {
      if (result.value) {
        this.Swal.fire(
          'Apagado!',
          'Arquivo apgado com sucesso',
          'success'
        )
      }
    })
  }

  addAddress() {
    this.updAddress = null;
    this.openDialog();
  }
  editAddress(address) {
    this.updAddress = address;
    this.openDialog();
  }

  removeAddress(address) {
    this.Swal.fire({
      title: 'Deseja excluir esse registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      showCancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exluir!'
    }).then((result) => {
      if (result.value) {
        this.addressService.deleteAddress(address.idEndereco)
          .subscribe(data => {
            this.start();
          })
        this.Swal.fire(
          'Apagado!',
          'Registro apgado com sucesso!',
          'success'
        )
      }
    })
  }


  removePhone(phone) {
    this.Swal.fire({
      title: 'Deseja excluir esse registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      showCancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exluir!'
    }).then((result) => {
      if (result.value) {
        this.profileUserService.deletePhone(phone.idTelefone)
          .subscribe(data => {
            this.start();
          })
        this.Swal.fire(
          'Apagado!',
          'Registro apgado com sucesso!',
          'success'
        )
      }
    })
  }


}
