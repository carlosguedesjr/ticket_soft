import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ReCaptchaService } from './../../services/ReCaptchaService.service';
import { ConfigService } from './../../services/Config.service';


@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit, ControlValueAccessor {

  @Input() site_key: string = null;
  @Input() theme = 'light';
  @Input() type = 'image';
  @Input() size = 'normal';
  @Input() tabindex = 0;
  @Input() badge = 'bottomright';
  /* Available languages: https://developers.google.com/recaptcha/docs/language */
  @Input() language: string = null;

  @Output() captchaResponse = new EventEmitter<string>();
  @Output() captchaExpired = new EventEmitter();

  @ViewChild('target', {static: false}) targetRef: ElementRef;
  widgetId: any = null;

  onChange: Function = () => { };
  onTouched: Function = () => { };

  constructor(
    private _zone: NgZone,
    private _captchaService: ReCaptchaService,
    private _config: ConfigService
  ) { }

  ngOnInit() {
    this._captchaService.getReady(this.language)
      .subscribe((ready) => {
        // tslint:disable-next-line:curly
        if (!ready)
          return;
        // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        this.widgetId = (<any>window).grecaptcha.render(this.targetRef.nativeElement, {
          'sitekey': this._config.getReCaptchaKey(),
          'badge': this.badge,
          'theme': this.theme,
          'type': this.type,
          'size': this.size,
          'tabindex': this.tabindex,
          'callback': <any>((response: any) => this._zone.run(this.recaptchaCallback.bind(this, response))),
          'expired-callback': <any>(() => this._zone.run(this.recaptchaExpiredCallback.bind(this)))
        });
      });
  }

  /**
  *  Reset current captcha
  *
  * @returns
  *
  * @memberOf ReCaptchaComponent
  */
  // noinspection JSUnusedGlobalSymbols
  public reset() {
    // tslint:disable-next-line:curly
    if (this.widgetId === null)
      return;
    // noinspection TypeScriptUnresolvedVariable
    (<any>window).grecaptcha.reset(this.widgetId);
    this.onChange(null);
  }

  /**
   *  Init captcha
   *
   * @returns
   *
   * @memberOf ReCaptchaComponent
   */
  // noinspection JSUnusedGlobalSymbols
  public execute() {
    // tslint:disable-next-line:curly
    if (this.widgetId === null)
      return;
    // noinspection TypeScriptUnresolvedVariable
    (<any>window).grecaptcha.execute(this.widgetId);
  }

  /**
   *  Get return response
   *
   * @returns {String}
   *
   * @memberOf ReCaptchaComponent
   */
  public getResponse(): String {
    // tslint:disable-next-line:curly
    if (this.widgetId === null)
      return null;
    // noinspection TypeScriptUnresolvedVariable
    return (<any>window).grecaptcha.getResponse(this.widgetId);
  }

  /**
   * WriteValue
   *
   * @param {*} newValue
   *
   * @memberOf ReCaptchaComponent
   */
  writeValue(newValue: any): void {
    /* ignore it */
  }

  /**
   * Change event
   *
   * @param {*} fn
   *
   * @memberOf ReCaptchaComponent
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * On touch captcha
   *
   * @param {*} fn
   *
   * @memberOf ReCaptchaComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Callback captcha
   *
   * @private
   * @param {string} response
   *
   * @memberOf ReCaptchaComponent
   */
  private recaptchaCallback(response: string) {
    this.onChange(response);
    this.onTouched();
    this.captchaResponse.emit(response);
  }

  /**
   * Return captcha expired
   *
   * @private
   *
   * @memberOf ReCaptchaComponent
   */
  private recaptchaExpiredCallback() {
    this.onChange(null);
    this.onTouched();
    this.captchaExpired.emit();
  }

}
