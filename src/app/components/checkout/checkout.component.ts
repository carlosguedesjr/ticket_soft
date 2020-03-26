import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ConfigService } from 'src/app/services/Config.service';
import { User } from '../auth/user.model';
import { AuthService } from 'angular-6-social-login';
import { AuthenticationService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass', './checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  statusStepOne: boolean = false;
  statusStepTwo: boolean = false;
  statusStepThree: boolean = false;
  user: any;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      this.user = data;
    })
  }

  toggleStatusStepOne(event: any) {
    this.statusStepOne = event;
  }

  toggleStatusStepTwo(event: any) {
    this.statusStepTwo = event;
  }

  toggleStatusStepThree(event: any) {
    this.statusStepThree = event;
  }

  moveStep() {
    if (this.user) {
      this.nextStep(2);
    } else {
      this.nextStep(1);
    }
  }

  nextStep(stepNumber: number) {
    this.stepper.linear = false;
    this.stepper.selected.editable = false;
    this.stepper.selectedIndex = stepNumber;
    this.stepper.linear = true;
  }

  // toStepThree() {
  //   this.stepper.linear = false;
  //   this.stepper.selected.editable = false;
  //   this.stepper.selectedIndex = 2;
  //   this.stepper.linear = true;
  // }

  // toStepFour() {
  //   this.stepper.linear = false;
  //   this.stepper.selected.editable = false;
  //   this.stepper.selectedIndex = 3;
  //   this.stepper.linear = true;
  // }

}
