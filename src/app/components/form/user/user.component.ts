import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/Notification.service';
import { ProfileUserService } from 'src/app/services/ProfileUser.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  login: any;
  @Input() userInformation: any;
  genders: any;
  personType: any
  valueDesabilitie: string = 'no';
  userInformationForm: FormGroup;
  Swal = (Swal as any);
  clientType: any;


  // save() {
  //   this.notificationService.success('Salvo com sucesso!');
  // }

  constructor(private profileUserService: ProfileUserService
    , private fb: FormBuilder
  ) { }


  ngOnInit() {

    this.genders = this.profileUserService.getGenders() ;

    this.profileUserService.getPersonType().subscribe(
      data => {
        this.personType = data;
      }
    )

   this.profileUserService.getClientType().subscribe(
      data => {
         this.clientType = data;
      }
    )

    this.userInformationForm = this.fb.group({
      name: ['', Validators.required],
      datepicker: [''],
      birthday: [''],
      gender: ['', Validators.required],
      document: ['', Validators.required],
      age: [''],
      email: ['', [Validators.email, Validators.required]],
      personType:['', Validators.required],
      clientType:['', Validators.required]
    })
  }

  ngOnChanges() {
    if (this.userInformation) {
      console.log('opa: ',this.userInformation);
      console.log('genero: ',this.userInformation.sexo);
      
      this.userInformationForm.patchValue({
        name: this.userInformation.nome,
        datepicker: this.userInformation.dtCadastro,
        //birthday: new FormControl((new Date(this.userInformation.birthday)).toISOString()),
        gender: this.userInformation.sexo,
        document: this.userInformation.cpfCnpj,
        email: this.userInformation.email,
        personType: this.userInformation.idTipoPessoa,
        clientType: this.userInformation.idTipoCliente
      })
    }
  }

  calculateAge(event) {
    var years = moment().diff(moment(event['value']).format('L'), 'years');
    this.userInformationForm.patchValue({
      age: years
    })
  }

  saveForm(): void {
    this.profileUserService.update(this.userInformationForm.value)
      .subscribe(data => {
        this.Swal.fire(
          'Perfil atualizado com sucess!',
          data,
          'success'
        )
      }),
      err => {
        //Ajustar...não chega aqui..
        this.Swal.fire(
          'Erro ao atualizar seu perfil!',
          err,
          'error'
        )
      }
  }
}