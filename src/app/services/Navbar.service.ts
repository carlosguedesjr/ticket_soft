import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  static toggleSidenav = new EventEmitter<any>();
  static visibleApps = new EventEmitter<object>();
  static visibleUserInf = new EventEmitter<object>();

  constructor() { }

  sidenavToggle(hiddenSidenav: boolean) {
    NavbarService.toggleSidenav.emit(hiddenSidenav);
  }

  stateVisibleApps(stateApps: boolean, isFromOutsideClick?: boolean) {
    NavbarService.visibleApps.emit({stateApps, isFromOutsideClick});
  }

  stateVisibleUserInf(stateUserInf: boolean, isFromOutsideClick?: boolean) {
    NavbarService.visibleUserInf.emit({stateUserInf, isFromOutsideClick});
  }
}
