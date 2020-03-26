import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class slideShoppingCartService {

  static slideStateShoppingCart = new EventEmitter<any>();
  static closeShoppingCart = new EventEmitter<any>();

  constructor() { }

  changeState(eventType: string) {
    slideShoppingCartService.slideStateShoppingCart.emit(eventType);
  }

  closeShoppingCart(eventType: string) {
    slideShoppingCartService.closeShoppingCart.emit(eventType);
  }

}
