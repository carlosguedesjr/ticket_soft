import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/Auth.service';
import { Observable } from 'rxjs';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RegisterUserService } from '../../services/registerUser.service';
import { JwtService } from 'src/app/services/Jwt.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-popover-login',
  templateUrl: './popover-login.component.html',
  styleUrls: ['./popover-login.component.sass', './popover-login.component.css'],
  animations: [
    trigger('exceededAttempts', [
      state('closed', style({
        zIndex: -1000,
        opacity: 0,
        transform: 'scale(0, 0)'
      })),
      state('passExpanded', style({
        zIndex: -1000,
        opacity: 0,
        transform: 'scale(0, 0)'
      })),
      state('expanded', style({
        zIndex: 1000,
        opacity: 1,
        transform: 'scale(1, 1)'
      })),
      transition('closed => expanded', animate(350)),
      transition('expanded => closed', animate(350))
    ]),
    trigger('passwordRecovery', [
      state('closed', style({
        zIndex: -1000,
        opacity: 0,
        transform: 'scale(0, 0)'
      })),
      state('passExpanded', style({
        zIndex: 1000,
        opacity: 1,
        transform: 'scale(1, 1)'
      })),
      state('expanded', style({
        zIndex: -1000,
        opacity: 0,
        transform: 'scale(0, 0)'
      })),
      transition('closed => passExpanded', animate(300)),
      transition('passExpanded => closed', animate(300))
    ]),
  ]
})
export class PopoverLoginComponent implements OnInit {

  @ViewChild('passwordCostumer', { static: false }) passwordCostumer: ElementRef;
  loginForm: FormGroup;
  recoveryPasswordForm: FormGroup;
  isLoading: boolean = false;
  emailAndCPFValidation: boolean = false;
  errorPassword: string;
  genericError: string;
  emailError: string;
  state: string = 'closed';
  count: number = 1;
  recoverPasswordWindow: boolean = false;
  errorGettingEmail: boolean = false;
  errorRequestResetPass;

  constructor(private authService: AuthenticationService, private socialAuthService: AuthService, private jwtService: JwtService) { }

  ngOnInit() {
    this.recoveryPasswordForm = new FormGroup({
      'emailRecovery': new FormControl("", [Validators.required, this.validateEmailAndCPF.bind(this)])
    });

    this.loginForm = new FormGroup({
      'emailOrCPF': new FormControl("", [Validators.required, this.validateEmailAndCPF.bind(this)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.authService.sendOauthData(userData.email, userData.id, userData.token, userData.name, userData.image);
        this.jwtService.login();
      }
    );
  }

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

  async onSubmit() {
    if (this.count >= 5) {
      this.state = 'expanded';
    }

    if (!this.loginForm.valid) {
      return;
    }
    let authObs: Observable<any>;

    this.isLoading = true;
    const emailOrCPF = this.loginForm.value.emailOrCPF;
    const password = this.loginForm.value.password;

    // CALL TO LOGIN
      this.errorPassword = null;
      this.genericError = null;
      this.authService.login(emailOrCPF, password).subscribe(
        data => {
          if (data.status == 401) {
            this.state = 'expanded';
          }
          this.isLoading = false;
          this.loginForm.reset();
          //logado atraves do email.
          //verificar se existe carrinho perdido no sessionStorage
        },
        errorMessage => {
          this.count++;
          switch (errorMessage) {
            case 'E-mail não cadastrado':
              this.emailError = "Usuário não cadastrado. Clique em 'Cadastrar-se'";
              break;
            case 'Senha incorreta!':
              this.errorPassword = errorMessage;
              break;
            default:
              this.genericError = errorMessage;
          }
          console.log(errorMessage);
          this.isLoading = false;
        }
      );
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

  passwordRecovery(form: FormGroup) {
    if (!this.recoveryPasswordForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.requestReset(this.recoveryPasswordForm.value)
      .subscribe(data => {
        this.recoverPasswordWindow = true;
        setTimeout(() => {
          this.isLoading = false;
          this.recoveryPasswordForm.reset();
          this.state = 'closed';
          this.recoverPasswordWindow = false;
        }, 3500);
      }),
      err => {
        var error = err.error.error.message;
        if (error) {
          this.errorGettingEmail = true;
          this.errorRequestResetPass = error;
        }
      }
  }

  toggleState() {
    this.state = 'passExpanded';
  }

  closePopup() {
    this.state = 'closed';
  }

}
