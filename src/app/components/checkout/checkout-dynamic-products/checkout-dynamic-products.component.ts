import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-dynamic-products',
  templateUrl: './checkout-dynamic-products.component.html',
  styleUrls: ['./checkout-dynamic-products.component.sass', './checkout-dynamic-products.component.css']
})
export class CheckoutDynamicProductsComponent implements OnInit {

  @Input() products: any;
  @Input() reference: any;
  @Input() invit: any;
  @Output() emitValueProductAttribute = new EventEmitter<any>();
  @Output() actionProduct = new EventEmitter<any>();

  checked: boolean;

  constructor() { }

  ngOnInit() {
  }

  getValueAttribute(value) {
    this.emitValueProductAttribute.emit(value);
  }

  checkProduct(event) {
    let tempObj = {};
    const arrayProduct = event.formGroupProduct.value;

    if (event.type === 'add') {
      tempObj = {
        event_id: this.reference.event_id,
        event_index: this.reference.event_index,
        invit: this.reference.invit,
        action: 'add',
        product: arrayProduct,
        attribute: 'products'
      };

      this.actionProduct.emit(tempObj);

    } else {

      tempObj = {
        event_id: this.reference.event_id,
        event_index: this.reference.event_index,
        invit: this.reference.invit,
        action: 'remove',
        product: arrayProduct,
        attribute: 'products'
      };
      this.actionProduct.emit(tempObj);

    }
  }

}
