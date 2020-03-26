import { Injectable, NgZone, Optional, SkipSelf } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class ReCaptchaService {

    private scriptLoaded = false;
    private readySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(zone: NgZone) {
        window[<any>'reCaptchaOnloadCallback'] = <any>(() => zone.run(this.onloadCallback.bind(this)));
    }

    public getReady(language: String): Observable<boolean> {
        if (!this.scriptLoaded) {
            this.scriptLoaded = true;
            const doc = <HTMLDivElement>document.body;
            const script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://www.google.com/recaptcha/api.js?onload=reCaptchaOnloadCallback&render=explicit' +
                (language ? '&hl=' + language : '');
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
        return this.readySubject.asObservable();
    }

    private onloadCallback() {
        this.readySubject.next(true);
    }
}

/* singleton pattern taken from https://github.com/angular/angular/issues/13854 */
export function RECAPTCHA_SERVICE_PROVIDER_FACTORY(ngZone: NgZone, parentDispatcher: ReCaptchaService) {
    return parentDispatcher || new ReCaptchaService(ngZone);
}

export const RECAPTCHA_SERVICE_PROVIDER = {
    provide: ReCaptchaService,
    deps: [NgZone, [new Optional(), new SkipSelf(), ReCaptchaService]],
    useFactory: RECAPTCHA_SERVICE_PROVIDER_FACTORY
};
