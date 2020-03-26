import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RegisterUserService } from 'src/app/services/registerUser.service';
import { AuthenticationService } from 'src/app/services/Auth.service';
import { Observable, Subscription } from 'rxjs';
import { CheckoutService } from 'src/app/services/Checkout.service';

@Component({
  selector: 'app-checkout-step-two',
  templateUrl: './checkout-step-two.component.html',
  styleUrls: ['./checkout-step-two.component.sass', './checkout-step-two.component.css']
})
export class CheckoutStepTwoComponent implements OnInit, OnDestroy {

  @Output() statusStepTwo = new EventEmitter<string>();
  @Output() stepTwoEmitter = new EventEmitter();

  private subscription = new Subscription();

  recoveryPasswordForm: FormGroup;
  registerUserForm: FormGroup;
  createAccount: FormGroup;
  loginForm: FormGroup;

  password: string = '';
  passwordMessage: string = '';
  confirmPassword: string = '';
  confirmPasswordMessage: string = '';

  isLoading: boolean = false;
  isLoadingSignup: boolean = false;
  isLoadingRegister: boolean = false;
  showSuccessMessage: boolean = false;
  emailAlreadyExists: boolean = false;
  forgotPasswordPage: boolean = false;
  recoverPasswordWindow: boolean = false;
  errorGettingEmail: boolean = false;
  errorRequestResetPass: boolean = false;

  noAccount: boolean = true;
  params: any[];
  hideLoginCostumer = false;
  hideNewCostumer = true;

  errorPassword: string;
  genericError: string;
  emailError: string;

  private _initialValue;

  @ViewChild('passwordCostumer', { static: false }) passwordCostumer: ElementRef;

  genders: Array<Object> = [
    { value: 'female', text: 'GENDER.FEMALE' },
    { value: 'male', text: 'GENDER.MALE' },
    { value: 'other', text: 'GENDER.OTHER' },
    { value: 'uniformed', text: 'GENDER.UNINFORMED' },
  ];

  constructor(private registerUserService: RegisterUserService, private authService: AuthenticationService, private checkoutService: CheckoutService) { }

  ngOnInit() {

    this.recoveryPasswordForm = new FormGroup({
      'emailRecovery': new FormControl("", [Validators.required, this.validateEmailAndCPF.bind(this)])
    });

    this.loginForm = new FormGroup({
      'loginCostumer': new FormControl('', [Validators.required, Validators.email]),
      'loginPassword': new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,20}$/)
        ])
    });

    this.createAccount = new FormGroup({
      'newEmailCostumer': new FormControl('', [Validators.required, Validators.email])
    });

    this.registerUserForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.maxLength(30)]),
      'secondName': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      'mail': new FormControl("", [Validators.required, this.registerUserService.validateEmail]),
      'CPF': new FormControl("", [Validators.required, this.registerUserService.validateCPF]),
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

    this.registerUserForm.statusChanges.subscribe(data => {
      if (data == 'VALID') {
        this.statusStepTwo.emit("true");
      } else {
        this.statusStepTwo.emit("false");
      }
    })

    this.loginForm.statusChanges.subscribe(data => {
      if (data == 'VALID') {
        this.statusStepTwo.emit("true");
      } else {
        this.statusStepTwo.emit("false");
      }
    })

    this.registerUserService.allowNextStepper.subscribe(data => {
      this.stepTwoEmitter.emit();
    })

    this.forgotPasswordPage = false;

  }

  validateEmailAndCPF(control: FormControl): any {

    const emailValidateStatus = this.validateEmail(control);
    const cpfValidateStatus = this.validateCPF(control);

    if (emailValidateStatus === false && cpfValidateStatus === false) {
      return { 'emailOrCPF': true };
    }
    return null;
  }

  validateEmail(control: FormControl): boolean {

    if (control.value == null) return false;

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
      return true;
    }
    else {
      return false;
    }
  }

  validateCPF(control: FormControl): boolean {
    let Soma;
    let Resto;
    Soma = 0;
    if (control.value == null) return false;
    if (control.value == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(control.value.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(control.value.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(control.value.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(control.value.substring(10, 11))) return false;
    return true;
  }

  socialSignIn(socialNetwork: string) {
    this.loginForm.get('loginCostumer').setErrors(null);
    this.loginForm.get('loginPassword').setErrors(null);
    this.registerUserService.socialSignIn(socialNetwork);
  }

  newEmailCostumer = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginCostumer = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  showPassword(e) {
    const el = (e.target as Element);

    if (this.passwordCostumer.nativeElement.getAttribute('type') === 'password') {
      el.innerHTML = 'visibility';
      this.passwordCostumer.nativeElement.setAttribute('type', 'text');
    } else {
      el.innerHTML = 'visibility_off';
      this.passwordCostumer.nativeElement.setAttribute('type', 'password');
    }
  }

  continueToSignUp(form: FormGroup) {
    this.isLoadingSignup = true

    // this.authService.verifyIfEmailExists(form.value.newEmailCostumer).subscribe(data => {
    this.noAccount = false;
    this.isLoadingSignup = false;

    this.registerUserForm.patchValue({
      mail: form.value.newEmailCostumer   
    })
    // },
    // errorMessage => {
    //   this.emailAlreadyExists = true;
    // })

  }

  registerUser() {
    this.isLoadingRegister = true;

    if (!this.registerUserForm.valid) {
      return;
    }

    const name = this.registerUserForm.value.name;
    const secondName = this.registerUserForm.value.secondName;
    const email = this.registerUserForm.value.mail;
    const cpf = this.registerUserForm.value.CPF;
    const gender = this.registerUserForm.value.gender;
    const birthDate = this.registerUserForm.value.birthDate;
    const password = this.registerUserForm.value.password;

    // this.authService.signup(
    //   name,
    //   secondName,
    //   email,
    //   cpf,
    //   gender,
    //   birthDate,
    //   password
    // ).subscribe(data => {
    //     console.log('DATA', data);
    //     console.log("Usuário Cadastrado com SUCESSO!");

    this.authService.login(this.registerUserForm.value.mail, this.registerUserForm.value.password).subscribe(data => {
      this.isLoadingRegister = false;
      this.stepTwoEmitter.emit();
    },
      err => {
        console.log(err);
      })
    // },
    // errorMessage => {
    //   console.log(errorMessage);
    //   this.isLoading = false;
    // });

  }

  login(loginForm: FormGroup) {

    if (!this.loginForm.valid) {
      return;
    }

    let authObs: Observable<any>;

    this.isLoading = true;

    const loginCostumer = this.loginForm.value.loginCostumer;
    const loginPassword = this.loginForm.value.loginPassword;

    authObs = this.authService.login(loginCostumer, loginPassword);

    this.errorPassword = null;
    this.genericError = null;
    authObs.subscribe(data => {
      this.isLoading = false;
      this.stepTwoEmitter.emit();
    },
      err => {
        switch (err) {
          case 'E-mail não cadastrado':
            this.emailError = "Usuário não cadastrado. Clique em 'Cadastrar-se'";
            break;
          case 'Senha incorreta!':
            this.errorPassword = err;
            break;
          default:
            this.genericError = err;
        }

        this.isLoading = false;
        console.log(err);
      });
  }

  passwordRecovery() {
    if (!this.recoveryPasswordForm.valid) {
      return;
    }
    this.isLoading = true;
    // this.authService.requestReset(this.recoveryPasswordForm.value)
      // .subscribe(data => {
        setTimeout(() => {
        this.recoverPasswordWindow = true;
        this.forgotPasswordPage = false;
        setTimeout(() => {
          this.isLoading = false;
          this.recoveryPasswordForm.reset();
          this.returnStepTwoFirstPage();
        }, 3500);
        }, 3000);
      // }),
      // err => {
      //   var error = err.error.error.message;
      //   if (error) {
      //     this.errorGettingEmail = true;
      //     this.errorRequestResetPass = error;
      //   }
      // }
  }

  returnStepTwoFirstPage() {
    this.noAccount = true;
    this.forgotPasswordPage = false;
    this.recoverPasswordWindow = false;
  }

  callForgotPasswordPage() {
    this.forgotPasswordPage = true;
    this.noAccount = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
