import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Import's Services
 */
import { AddressService } from './../../../services/Address.service';
import { ConfigService } from 'src/app/services/Config.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Address } from 'src/app/interfaces/address';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  isEditing = false;
  addressType: any;
  addressForm: FormGroup;
  login: any;
  addressUser: any;
  Swal = (Swal as any);
  states: any;
  cities: any;
  countries: any;
  selectState: string;
  selectCity: string;

  @ViewChild('number', { static: false }) number: ElementRef;

  constructor(private addressService: AddressService,
    private fb: FormBuilder,
    private configService: ConfigService,
    public dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address
  ) { }

  saveForm(): void {
    if (this.data.address){
      this.addressService.putAddress(this.addressForm.value)
      .subscribe(data => {
        this.Swal.fire(
          'Endereço salvo com sucesso!',
          data,
          'success'
        )
        this.dialogRef.close();
      }),
      err => {
        //Ajustar...não chega aqui..
        this.Swal.fire(
          'Erro ao salvar endereço!',
          err,
          'error'
        )
      }
    }
    else
    {
      this.addressService.saveAddress(this.addressForm.value)
      .subscribe(data => {
        this.Swal.fire(
          'Endereço salvo com sucesso!',
          data,
          'success'
        )
        this.dialogRef.close();
      }),
      err => {
        //Ajustar...não chega aqui..
        this.Swal.fire(
          'Erro ao salvar endereço!',
          err,
          'error'
        )
      }
    }
  }

  ngOnInit() {
    this.addressService.getTypeAddress().then((res) => {
      this.addressType = res;
    }).catch((error) => {
      console.log(error);
    });

    this.addressService.getCountries().then((res) => {
      this.countries = res;
    })

    this.login = this.configService.login();
    this.addressForm = this.fb.group({
      address_id:[''],
      type: ['', Validators.required],
      postalcode: ['', Validators.required],
      address: ['', Validators.required],
      number: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      neighborhood: ['', Validators.required],
      complementaryInfo: [''],
      referencePoint: [''],
    });

    this.addressForm.patchValue({
      address_id : this.data.address['idEndereco'],
      type: this.data.address['idTipoEndereco'],
      address: this.data.address['logradouro'],
      number: this.data.address['numero'],
      neighborhood: this.data.address['bairro'],
      city: this.data.address['idCidade'],
      state: this.data.address['estado'],
      country: this.data.address['pais'],
      complementaryInfo: this.data.address['complemento'],
      referencePoint: this.data.address['referenciaEndereco'],
      postalcode: this.data.address['cep'],
    });


    this.selectState = this.data.address['estado'];
    this.selectCity = this.data.address['idCidade'];
  }

  getCEPData(event) {
    let valueCep = event.target.value;

    valueCep = valueCep.replace('.', '');
    valueCep = valueCep.replace('-', '');

    this.addressService.getAddressFromCep(valueCep).then((res) => {
      if (res == null || res == undefined) {
        this.addressForm.reset();
      }
      this.selectState = res['uf'];


      this.searchCity(res['uf']);

      this.addressForm.patchValue({
        postalcode: valueCep,
        address: res['logradouro'],
        city: res['localidade'],
        state: res['uf'],
        country: 'Brasil',
        neighborhood: res['bairro'],
        complementaryInfo: res['complemento'],
      });
      this.number.nativeElement.focus();
    }).catch((error) => {
      console.log(error);
    });
  }

  changeAddressType(address) {
    this.login = this.configService.login();

  }

  editAddress(element) {
    console.log('edit ', element);
  }

  deleteAddress(element) {
    console.log('delete', element);
  }

  async searchCity(event) {
    await this.addressService.getCitys(event).then((res) => {
      this.cities = res

    }).catch((err) => {
      console.log('cidades: ', err);
    })
  }

  setCity(event) {
    console.log('idCidade: ', event);
  }

  setContry(event) {
    console.log('codigoPais', event);
  }

  saveFormContact() {
    console.log('Formulario: ', this.addressForm.value);
  }

  setStates(event) {
    this.states = null;
    this.cities = null;
    this.addressService.getStates(event.value).then((res) => {
      this.states = res;
    }).catch((error) => {
      console.log(error);
    })
  } 

  async onSelectionState() {
    await this.searchCity(this.selectState);
    this.addressForm.get('city').setValue(this.selectCity);
  }

}
