import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthTokenService } from 'src/app/services/AuthToken.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.sass', './response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  @ViewChild('passwordReset', {static: false}) passwordReset: ElementRef;
  @ViewChild('passwordResetConfirm', {static: false}) passwordResetConfirm: ElementRef;

  responseResetForm: FormGroup;
  currentState: any;
  resetToken: null;
  IsResetFormValid = true;
  showSuccessMessage: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private authTokenService: AuthTokenService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.isLoading = true;
                this.route.params.subscribe(params => {
                  this.resetToken = params.token;
                  // this.verifyToken();
                  this.isLoading = false;
                  this.currentState = 'Verified';
                })
               }

  ngOnInit() {
    this.init();
  }

  init() {
    this.responseResetForm = new FormGroup(
      {
        'resettoken': new FormControl(this.resetToken),
        'newPassword': new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(20),  Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,20}$/)]),
        'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(20)])
      },
      {
        validators: this.validate
      }
    );
  }

  showPassword(e, whichElement: number) {
    const el = (e.target as Element);

    if (whichElement == 1) {
      if (this.passwordReset.nativeElement.getAttribute('type') === 'password') {
        el.innerHTML = 'visibility';
        this.passwordReset.nativeElement.setAttribute('type', 'text');
      } else {
        el.innerHTML = 'visibility_off';
        this.passwordReset.nativeElement.setAttribute('type', 'password');
      }
    } else {
      if (this.passwordResetConfirm.nativeElement.getAttribute('type') === 'password') {
        el.innerHTML = 'visibility';
        this.passwordResetConfirm.nativeElement.setAttribute('type', 'text');
      } else {
        el.innerHTML = 'visibility_off';
        this.passwordResetConfirm.nativeElement.setAttribute('type', 'password');
      }
    }
  }


  verifyToken() {
    this.isLoading = true;
    this.authTokenService.validPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.isLoading = false;
        this.currentState = 'Verified';
      },
      err => {
        this.currentState = 'NotVerified';
      }
    );
  }

  validate(passwordFormGroup: FormGroup): ValidationErrors | null {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

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

  ResetPassword(form: FormGroup) {
    this.isLoading = true;
    if (form.valid) {
      this.IsResetFormValid = true;
      this.authTokenService.newPassword(this.responseResetForm.value).subscribe(
        data => {
        // setTimeout(() => {              ****** PARA TESTE *****
          this.isLoading = false;
          // this.responseResetForm.reset();
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/login']);
          }, 3000);
        // }, 2000);
        },
        err => {
          this.isLoading = false;
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }

}
