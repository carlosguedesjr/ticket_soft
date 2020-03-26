import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-step-four',
  templateUrl: './checkout-step-four.component.html',
  styleUrls: ['./checkout-step-four.component.sass', 'checkout-step-four.component.css']
})
export class CheckoutStepFourComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

}
