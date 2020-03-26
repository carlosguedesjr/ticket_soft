import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-mat-select-dinamyc',
  templateUrl: './checkout-mat-select-dinamyc.component.html',
  styleUrls: ['./checkout-mat-select-dinamyc.component.sass']
})
export class CheckoutMatSelectDinamycComponent implements OnInit {

  @Input() event: FormGroup;
  @Input() valueSelected: FormGroup;
  @Input() reference: any;
  @Output() getValueSelected = new EventEmitter();
  typeSelected: any;

  constructor() { }

  ngOnInit() {
    if (this.valueSelected.value) {
      this.emitValueSelected(this.valueSelected.value.id_type_invite);
    }
  }

  getPropertiesTypeInvite(typeInviteId: number) {
    let obj = this.event.value;
    let result: any;

    obj.invite_type.map((typeInvite) => {
      if (typeInvite.id == typeInviteId) {
        result = typeInvite;
      }
    })

    return result;
  }

  emitValueSelected(idEvent) {
    this.typeSelected = idEvent;
    let reference = this.reference;
    let propertiesTypeInvite = this.getPropertiesTypeInvite(idEvent);

    let object = {
      id_type_invite: propertiesTypeInvite.id,
      price_type_invit: propertiesTypeInvite.price,
      invit: reference.invit,
      event_id: reference.eventId,
      event_index: reference.eventIndex
    }

    this.getValueSelected.emit(object);
  }
}
