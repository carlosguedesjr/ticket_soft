// import { UserService } from './UserService.service';
// import { User } from './../models/user';
import {
  Injectable,
  Inject,
  forwardRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Subscription } from "rxjs";

import { TranslateService } from "@ngx-translate/core";
import { User } from "../components/auth/user.model";

@Injectable()
export class ConfigService implements OnInit, OnDestroy {
  private apiUrl = "http://sasys.dev/api/";
  private urlCheckToken: string;
  private headers: HttpHeaders;
  private getToken: string;
  // private currentUser: User = new User();
  private geolocationKey = "AIzaSyAqyXOQpibSfNZtSgQvE4upIKZMIfHorwQ";
  private recaptchaKey = "6LcWhwgTAAAAAJDOirm1-cj1wNQMTpWAIY1dQZag";
  private langHeader: string;
  private tokgen: string;
  private subscript: Subscription;
  private sessionStorageShoppingCart: string = "sessionShoppingCart";
  public userData = "UserData";
  //public access_token = 'access_token';
  public imageProfilePublic =
    "https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/faces/avatar.jpg";
  public sessionFilter: string = "sessionfilter";
  public userJwt: string = "eptv.authentc";
  public passwordJwt: string = "O/paXtt5IgEuhyaUrp3mTWfVbts=";
  public userCode: number = 1;

  // 1680 segundos = 28 minutos.
  public expirationTokenSeconds: number = 1680;

  @Output() lang: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.subscript = this.lang.subscribe(res => {
      this.langHeader = res;
    });
  }

  /**
   *  Init Hash Token
   *
   * @memberof ConfigService
   */
  ngOnInit() {
    this.tokgen = this.getHash();
  }

  /**
   *  Unsubscribe
   *
   * @memberof ConfigService
   */
  ngOnDestroy() {
    this.subscript.unsubscribe();
  }

  /**
   *  Generate Hash Token
   *
   * @returns
   * @memberof ConfigService
   */
  public getHash() {
    const stringLength = 500;
    const stringArray = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
      "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
      "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C",
      "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
      "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "?"
    ];

    let rndString = "";

    for (let i = 1; i < stringLength; i++) {
      const rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
      rndString = rndString + stringArray[rndNum];
    }

    return btoa(rndString);
  }

  /**
   * Param to send url request
   *
   * @param {string} resource
   * @returns
   * @memberof ConfigService
   */
  public builder(resource: string) {
    return this.apiUrl + resource;
  }
  /**
   *  Get JSESSION ID
   *
   * @returns
   * @memberof ConfigService
   */
  public getJsessionId() {
    if (this.tokgen) {
      return this.tokgen;
    } else {
      const localTokgen = localStorage["JSESSIONID"]
        ? localStorage["JSESSIONID"]
        : {};
      if (Object.keys(localTokgen).length > 0) {
        return localTokgen;
      } else {
        this.tokgen = this.getHash();
        return this.tokgen;
      }
    }
  }

  /**
   *  Configure headers
   *
   * @returns
   * @memberof ConfigService
   */
  public getHeader() {
    const access_token = localStorage["ASCID"]
      ? JSON.parse(localStorage["ASCID"])
      : {};

    this.headers = new HttpHeaders();
    if (Object.keys(access_token).length > 0) {
      this.headers.append("Authorization", `Bearer ${access_token}`);
      this.headers.append("Content-Type", "application/json");
      this.headers.append("Content-Type", "application/x-www-form-urlencoded");
      this.headers.append("csrf-token", `${this.getJsessionId()}`);
      this.headers.append("Language", `${this.langHeader}`);
    } else {
      this.headers.append("Content-Type", "application/json");
      this.headers.append("Content-Type", "application/x-www-form-urlencoded");
      this.headers.append("Language", `${this.langHeader}`);
      this.headers.append("csrf-token", `${this.getJsessionId()}`);
    }

    return this.headers;
  }

  /**
   *  Get this token google map
   *
   * @returns
   * @memberof ConfigService
   */
  public googleKey() {
    return this.geolocationKey;
  }

  /**
   *  return this key ReCaptcha
   *
   * @returns
   * @memberof ConfigService
   */
  public getReCaptchaKey() {
    return this.recaptchaKey;
  }

  public sessionNameStorageShoppingCart() {
    return this.sessionStorageShoppingCart;
  }

  getLocale() {
    return "pt-Br";
  }

  login() {
    let usrData = sessionStorage.getItem(this.userData);
    if (!usrData) return;
    else return JSON.parse(usrData);
  }
}
