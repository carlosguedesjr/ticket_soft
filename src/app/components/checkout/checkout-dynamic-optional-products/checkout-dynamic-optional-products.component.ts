import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-dynamic-optional-products',
  templateUrl: './checkout-dynamic-optional-products.component.html',
  styleUrls: ['./checkout-dynamic-optional-products.component.sass', './checkout-dynamic-optional-products.component.css']
})
export class CheckoutDynamicOptionalProductsComponent implements OnInit {

  @Input() optional_products: any;
  @Input() product: any;
  @Input() reference: any;
  @Input() invit: any;
  @Output() emitValueProductAttribute = new EventEmitter<any>();
  @Output() actionOptionalProduct = new EventEmitter<any>();

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
        attribute: 'optional_products'
      };

      this.actionOptionalProduct.emit(tempObj);

    } else {

      tempObj = {
        event_id: this.reference.event_id,
        event_index: this.reference.event_index,
        invit: this.reference.invit,
        action: 'remove',
        product: arrayProduct,
        attribute: 'optional_products'
      };
      this.actionOptionalProduct.emit(tempObj);

    }
  }

  // getValueAttribute(value) {

  //   const objReponse = {
  //     invit: this.reference.invit,
  //     event_id: this.reference.eventId,
  //     event_index: this.reference.eventIndex
  //   };

  //   objReponse['id_'.concat(value.type)] = value.result.id;
  //   objReponse['index_'.concat(value.type)] = value.result.index;
  //   objReponse['id_product'] = value.result.id_product;
  //   objReponse['index_product'] = value.result.index_product;

  //   this.emitValueProductAttribute.emit(objReponse);
  // }

}
