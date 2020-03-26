import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-dynamic-attributes-product',
  templateUrl: './checkout-dynamic-attributes-product.component.html',
  styleUrls: ['./checkout-dynamic-attributes-product.component.sass', './checkout-dynamic-attributes-product.component.css']
})
export class CheckoutDynamicAttributesProductComponent implements OnInit {

  @Input() attributes: any;
  @Input() reference: any;
  @Output() setValueAttribute = new EventEmitter();
  typeSelected: any;
  colorSelected: string;
  objColors = [];

  constructor() { }

  ngOnInit() {
    this.colorSelected = '#3f51b5';
  }

  searchAttributeObj(attribute, attributeList) {
    let tempKey;
    let tempObj;

    Object.keys(attributeList).map((key) => {
      attributeList[key].map((atr, index) => {
        if (atr.type === attribute) {
          tempKey = key;
          atr['index'] = index;
          tempObj = atr;
        }
      })
    });

    return { type: tempKey, result: tempObj, id_product: this.reference.id_product, index_product: this.reference.index_product };
  }

  emitValueSelected(value) {
    this.setValueAttribute.emit(this.searchAttributeObj(value, this.attributes.value));
  }

  addBadgeSelect(el) {
    el.parentNode.classList.add('active');
    $(el).attr('matbadge', '✔');
    $(el).attr('ng-reflect-content', '✔');
    $(el).addClass('mat-badge mat-badge-overlap mat-badge-above mat-badge-after mat-badge-medium');
    $(el).append('<span _ngcontent-rcn-c37="" id="mat-badge-content-0" class="mat-badge-content mat-badge-active">✔</span>');
  }

  removeBadge(el) {
    el.parentNode.closest('ul').querySelector('.active').querySelector('.mat-badge-content').remove();
    el.parentNode.closest('ul').querySelector('.active').classList.remove('active');
    $(el).removeAttr('class');
    $(el).removeAttr('matbadge');
    $(el).removeAttr('ng-reflect-content');
  }

  emitValueSelectedColors(el) {

    let value: string;

    if (el.target.classList.contains('first-color') || el.target.classList.contains('second-color')) {
      el = el.target.parentNode;
      value = JSON.parse(el.querySelector('input').value);
      this.removeBadge(el);
      this.addBadgeSelect(el);
    } else {
      el = el.target;
      value = JSON.parse(el.querySelector('input').value);
      this.removeBadge(el);
      this.addBadgeSelect(el);
    }

    this.setValueAttribute.emit({ type: 'colors', result: value, id_product: this.reference.idOptionalProduct, index_product: this.reference.indexOptionalProduct });
  }

  chechHasArray(value) {
    let checkArray = false;

    if (Array.isArray(value)) {
      checkArray = true;
    }

    return checkArray;
  }
}
