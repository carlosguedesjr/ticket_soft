import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout-dynamic-attributes',
  templateUrl: './checkout-dynamic-attributes.component.html',
  styleUrls: ['./checkout-dynamic-attributes.component.sass', './checkout-dynamic-attributes.component.css']
})
export class CheckoutDynamicAttributesComponent implements OnInit {

  @Input() event: FormGroup;
  @Input() attributes: FormGroup;
  @Input() reference: any;
  @Output() getEventInput = new EventEmitter();

  valueInput: any;
  date: any;

  constructor() { }

  ngOnInit() {
    if (this.attributes.controls.type.value !== 'date') {
      this.valueInput = this.event.value.invites[this.reference.invit][this.attributes.controls.attribute.value];
    } else {
      this.valueInput = moment(moment(this.event.value.invites[this.reference.invit][this.attributes.controls.attribute.value], "DD/MM/YYYY").format('YYYY-MM-DD')).toDate();
    }
  }

  emitEvent(value) {
    let objValue: string;
    let reference = this.reference;

    if (this.attributes.controls.type.value !== 'date') { 
      objValue = value;
    } else {
      objValue = moment(value).format('DD/MM/YYYY')
    }

    let obj = {
      value: objValue,
      attribute: this.attributes.controls.attribute.value,
      invit: reference.invit,
      event_id: reference.event_id,
      event_index: reference.event_index
    };

    this.getEventInput.emit(obj);
  }

}
