import { Injectable, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angular-6-social-login';
import { AuthenticationService } from './Auth.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterUserService {

    public allowNextStepper = new Subject();

    constructor(private http: HttpClient, private socialAuthService: AuthService, private authService: AuthenticationService) {}

    socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "facebook"){
          socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }else if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
              this.allowNextStepper.next();
            this.authService.sendOauthData(userData.email, userData.id, userData.token, userData.name, userData.image);
          }
        );
      }

    showPassword(e, whichElement: number, elementRef: ElementRef) {
        const el = (e.target as Element);

        if (whichElement == 1) {
            if (elementRef.nativeElement.getAttribute('type') === 'password') {
            el.innerHTML = 'visibility';
            elementRef.nativeElement.setAttribute('type', 'text');
            } else {
            el.innerHTML = 'visibility_off';
            elementRef.nativeElement.setAttribute('type', 'password');
            }
        } else {
            if (elementRef.nativeElement.getAttribute('type') === 'password') {
            el.innerHTML = 'visibility';
            elementRef.nativeElement.setAttribute('type', 'text');
            } else {
            el.innerHTML = 'visibility_off';
            elementRef.nativeElement.setAttribute('type', 'password');
            }
        }
    }
    
    validateEmail(control: FormControl): any {

        if (control.value == null) return { 'mail': true };

        let usuario = control.value.substring(0, control.value.indexOf("@"));
        let dominio = control.value.substring(control.value.indexOf("@")+ 1, control.value.length);
        
        if ((usuario.length >=1) &&
            (dominio.length >=3) && 
            (usuario.search("@")==-1) && 
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) && 
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&      
            (dominio.indexOf(".") >=1)&& 
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return null;
        }
        else{
            return { 'mail': true };
        }
    }
    
    validateCPF(control: FormControl): any {
        let Soma;
        let Resto;
        Soma = 0;
        if (control.value == null) return { 'CPF': true };
        if (control.value == "00000000000") return { 'CPF': true };
            
        for (let i=1; i<=9; i++) Soma = Soma + parseInt(control.value.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(control.value.substring(9, 10)) ) return { 'CPF': true };
        
        Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(control.value.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(control.value.substring(10, 11) ) ) return { 'CPF': true };
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
    
    validateBirthDate(control: FormControl): any{
        let year = new Date(control.value).getFullYear();
        let today = new Date().getFullYear();
        
        if(today - year <= 18){
            return { 'birth': true}
        } else {
            return null;
        }
    }
    
}