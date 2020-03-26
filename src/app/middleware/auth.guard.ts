import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../services/Auth.service';
import {
    Route, Router, CanLoad, CanActivate, CanActivateChild,
    ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd,
    NavigationStart, ActivatedRoute
} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private http: HttpClient,
        private authenticationService: AuthenticationService,
        private activatedRoute: ActivatedRoute
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
        // if (localStorage.getItem('SSID')) {
        //     return true;
        // } else {
        //     this.router.navigate(['/logout']);
        //     return false;
        // }
    }
}
