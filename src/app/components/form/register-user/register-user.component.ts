import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/Auth.service';
import { Router } from '@angular/router';
import { RegisterUserService } from 'src/app/services/registerUser.service';
import { ProfileUserService } from 'src/app/services/ProfileUser.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass', './register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUserForm: FormGroup;
  password: string = '';
  passwordMessage: string = '';
  confirmPassword: string = '';
  confirmPasswordMessage: string = '';
  genders: any;
  isLoading: boolean = false;
  showSuccessMessage: boolean = false;

  @ViewChild('viewPassword', { static: false }) viewPassword: ElementRef;
  @ViewChild('viewConfirmPassword', { static: false }) viewConfirmPassword: ElementRef;

  // genders: Array<Object> = [
  //   { value: 'female', text: 'GENDER.FEMALE' },
  //   { value: 'male', text: 'GENDER.MALE' },
  //   { value: 'other', text: 'GENDER.OTHER' },
  //   { value: 'uniformed', text: 'GENDER.UNINFORMED' },
  // ];

  constructor(private authService: AuthenticationService
    , private router: Router
    , private registerUserService: RegisterUserService
    , private profileUserService: ProfileUserService) { }

  ngOnInit() {
    this.genders = this.profileUserService.getGenders();

    this.registerUserForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'mail': new FormControl("", [Validators.required, this.validateEmail.bind(this)]),
      'CPF': new FormControl("", [Validators.required, this.validateCPF.bind(this)]),
      'gender': new FormControl("", [Validators.required]),
      'birthDate': new FormControl("", [Validators.required, this.registerUserService.validateBirthDate]),
      'password': new FormControl("", [Validators.required, Validators.minLength(6),
      Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,20}$/)]),
      'confirmedPassword': new FormControl("", [Validators.required, Validators.minLength(6),
      Validators.maxLength(20)])
    },
      {
        validators: this.registerUserService.validate
      })
  }

  showPassword(e, whichElement: number) {
    const el = (e.target as Element);

    if (whichElement == 1) {
      if (this.viewPassword.nativeElement.getAttribute('type') === 'password') {
        el.innerHTML = 'visibility';
        this.viewPassword.nativeElement.setAttribute('type', 'text');
      } else {
        el.innerHTML = 'visibility_off';
        this.viewPassword.nativeElement.setAttribute('type', 'password');
      }
    } else {
      if (this.viewConfirmPassword.nativeElement.getAttribute('type') === 'password') {
        el.innerHTML = 'visibility';
        this.viewConfirmPassword.nativeElement.setAttribute('type', 'text');
      } else {
        el.innerHTML = 'visibility_off';
        this.viewConfirmPassword.nativeElement.setAttribute('type', 'password');
      }
    }
  }

  validateEmail(control: FormControl): any {

    if (control.value == null) return { 'mail': true };

    let usuario = control.value.substring(0, control.value.indexOf("@"));
    let dominio = control.value.substring(control.value.indexOf("@") + 1, control.value.length);

    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search("@") == -1) &&
      (dominio.search("@") == -1) &&
      (usuario.search(" ") == -1) &&
      (dominio.search(" ") == -1) &&
      (dominio.search(".") != -1) &&
      (dominio.indexOf(".") >= 1) &&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return null;
    }
    else {
      return { 'mail': true };
    }
  }

  validateCPF(control: FormControl): any {
    let Soma;
    let Resto;
    Soma = 0;
    if (control.value == null) return { 'CPF': true };
    if (control.value == "00000000000") return { 'CPF': true };

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(control.value.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(control.value.substring(9, 10))) return { 'CPF': true };

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(control.value.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(control.value.substring(10, 11))) return { 'CPF': true };
    return null;
  }

  validate(registerUserForm: FormGroup): ValidationErrors | null {
    const new_password = registerUserForm.controls.password.value;
    const confirm_password = registerUserForm.controls.confirmedPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }

  validateBirthDate(control: FormControl): any {
    let year = new Date(control.value).getFullYear();
    let today = new Date().getFullYear();
    if (today - year <= 18) {
      return { 'birth': true }
    } else {
      return null;
    }
  }

  registerUser() {
    console.log('user: ',this.registerUserForm);
    
    this.isLoading = true;

    if (!this.registerUserForm.valid) {
      return;
    }

    const name = this.registerUserForm.value.name;
    const email = this.registerUserForm.value.mail;
    const cpf = this.registerUserForm.value.CPF;
    const gender = this.registerUserForm.value.gender;
    const birthDate = this.registerUserForm.value.birthDate;
    const password = this.registerUserForm.value.password;

    this.authService.signup(
      name,
      email,
      cpf,
      gender,
      birthDate,
      password
    ).subscribe(data => {
      this.isLoading = false;
      this.showSuccessMessage = true;

      setTimeout(() => {
        this.showSuccessMessage = false;
        this.router.navigate(['/login']);
      }, 3000);
    },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
      });

  }

}
