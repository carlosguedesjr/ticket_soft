import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Inject } from '@angular/core';
import { CheckoutService } from 'src/app/services/Checkout.service';
import { AddressService } from 'src/app/services/Address.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ShippingAddress } from 'src/app/interfaces/shipping-address';
import { ConfigService } from 'src/app/services/Config.service';
import { login } from 'src/app/interfaces/login';
import { Address } from 'src/app/interfaces/address';
import { MatDialog } from '@angular/material';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { AddressComponent } from '../../form/address/address.component';

@Component({
	selector: 'app-checkout-step-three',
	templateUrl: './checkout-step-three.component.html',
	styleUrls: ['./checkout-step-three.component.sass', './checkout-step-three.component.css']
})
export class CheckoutStepThreeComponent implements OnInit {

	@Output() statusStepThree = new EventEmitter<string>();
	@Output() stepThreeEmitter = new EventEmitter();

	formCheckoutDelivery: FormGroup;
	addressFormFG: FormGroup;
	formArrayAddressForm: FormArray;

	Swal = (Swal as any);
	addressType: any;
	addresses: Address[];
	pUf: string;
	pPais: string;
	shippingAddress: ShippingAddress;
	formResult: string = '';
	login: login;
	count: number = 0;

	updAddress: any;
	name: string = "Halisson";
	animal: string = "Zebra";


	constructor(private checkoutService: CheckoutService,
		private addressService: AddressService,
		private formBuilder: FormBuilder,
		private configService: ConfigService,
		public dialog: MatDialog) { }

	ngOnInit() {

		this.getUserWithAddresses();

		// this.formCheckoutDelivery = this.formBuilder.group({
		//   fcnAddressType: ['', Validators.required],
		//   fcnPostalCode: ['', Validators.required],
		//   fcnLogradouro: ['', Validators.required],
		//   fcnNumber: [''],
		//   fcnNeighborhood: ['', Validators.required],
		//   fcnCity: ['', Validators.required],
		//   fcnState: ['', Validators.required],
		//   fcnCountry: ['', Validators.required],
		// })

		this.formCheckoutDelivery = this.formBuilder.group({
			radioAddress: [0],
			formArrayAddAddress: this.formBuilder.array([
				this.addressFormFG = this.formBuilder.group({
					formArrayAddressForm: this.formBuilder.array(
						[]
					)
				})
			])
		})

		this.checkoutService.getAddresType().then((res) => {
			this.addressType = res;
			this.start();
		}).catch((error) => {
			console.log(error);
		});

		// VERIFICAÇÃO DO STATUS DO STEPPER, SE VÁLIDO PERMITE PASSAR PARA O PRÓXIMO
		this.formCheckoutDelivery.statusChanges.subscribe(data => {
			if (data === 'VALID') {
				this.statusStepThree.emit('true');
			} else {
				this.statusStepThree.emit('false');
			}
		});
	}

	start() {
    this.checkoutService.getAddressesByUser().subscribe(addresses => {
			this.addresses = addresses;
		})
  }

	createAddress() {
		return this.formBuilder.group({
			type: '',
			street_Address: '',
			neighborhood: '',
			country: '',
			state: '',
			city: '',
			zipcode: ''
		})
	}

	getUserWithAddresses() {
		const user = JSON.parse(sessionStorage.getItem(this.configService.userData));
		if (!user) {
			return;
		}

		this.checkoutService.getAddressesByUser().subscribe(addresses => {
			this.addresses = addresses;
		})
	}

	saveCheckoutDelivery(formCheckoutDelivery: FormGroup) {
		if (this.formCheckoutDelivery.status === 'VALID') {
			this.stepThreeEmitter.emit();
		}

		if (this.formCheckoutDelivery.dirty && this.formCheckoutDelivery.valid) {
			this.shippingAddress = Object.assign({}, this.shippingAddress, this.formCheckoutDelivery.value);
			this.formResult = JSON.stringify(this.formCheckoutDelivery.value);
		}
	}

	getCEPData(event) {
		let valueCep = event.target.value;
		valueCep = valueCep.replace('.', '').replace('-', '');

		this.addressService.getAddressFromCep(valueCep).then((res) => {
			this.formCheckoutDelivery.patchValue({
				fcnLogradouro: res["logradouro"],
				fcnNeighborhood: res["bairro"],
				fcnCity: res["localidade"],
				fcnState: res["uf"],
				fcnCountry: res["pais"],
			})
		}).catch((error) => {
			console.log(error);
		});
	}

	changeAddressType(address) {
		// this.login = this.configService.login();
		// Ajustar alterar para o método: listOfAddressesByUser
		// this.checkoutService.getbkShippingAddress(this.login.email, address.type).then((res) => {
		//   console.log(res);
		//   this.formCheckoutDelivery.patchValue({
		//     // AJUSTAR remover o zero
		//     fcnLogradouro: res[0]["street_Address"],
		//     fcnNeighborhood: res[0]["neighborhood"],
		//     fcnNumber: res[0]["number_street"],
		//     fcnCity: res[0]["city"],
		//     fcnState: res[0]["state"],
		//     fcnCountry: res[0]["country"],
		//     fcnPostalCode: res[0]["zipcode"]
		//   })
		// }).catch((error) => {
		//   console.log(error);
		// });
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(AddressComponent, {
			width: '800px',
			data: { "address": this.updAddress }
		});

		dialogRef.afterClosed().subscribe(result => {
			this.animal = result;
			this.start();
		});
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
		// this.Swal.fire({
    //   title: 'Deseja excluir esse registro?',
    //   text: "",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   showCancelButtonText: 'Cancelar',
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sim, exluir!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.addressService.deleteAddress(address.idEndereco)
    //       .subscribe(data => {
    //         this.start();
    //       })
    //     this.Swal.fire(
    //       'Apagado!',
    //       'Registro apgado com sucesso!',
    //       'success'
    //     )
    //   }
    // })
  }


  removePhone(phone){
    // this.Swal.fire({
    //   title: 'Deseja excluir esse registro?',
    //   text: "",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   showCancelButtonText: 'Cancelar',
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sim, exluir!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.profileUserService.deletePhone(phone.idTelefone)
    //       .subscribe(data => {
    //         this.start();
    //       })
    //     this.Swal.fire(
    //       'Apagado!',
    //       'Registro apgado com sucesso!',
    //       'success'
    //     )
    //   }
    // })
	}
}
