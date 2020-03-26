import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CheckoutService } from 'src/app/services/Checkout.service';
import { ConfigService } from 'src/app/services/Config.service';

@Component({
  selector: 'app-checkout-mat-checked-dynamic',
  templateUrl: './checkout-mat-checked-dynamic.component.html',
  styleUrls: ['./checkout-mat-checked-dynamic.component.sass']
})
export class CheckoutMatCheckedDynamicComponent implements OnInit {

  @Input() idProduct: string;
  @Input() formGroupProduct: any;
  @Input() invitation: any;
  @Input() products: any;
  @Output() emitCheckProduct = new EventEmitter();
  checked: boolean;

  constructor(private checkoutService: CheckoutService, private configService: ConfigService) { }

  ngOnInit() {

    if (this.invitation.value) {
      this.invitation.value.map((e) => {
        if (e.id === this.idProduct) {
          this.checked = true;
        }
      });
    }

  }
  
  checkProduct(event) {
    const checked = event.target.querySelector('input').checked;
    if (!checked ) {
      this.emitCheckProduct.emit({ type: 'add', formGroupProduct: this.formGroupProduct});
    } else {
      this.emitCheckProduct.emit({ type: 'remove', formGroupProduct: this.formGroupProduct});
    }
  }
}
