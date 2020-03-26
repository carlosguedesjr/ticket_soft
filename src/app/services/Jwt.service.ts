import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './Config.service';
import { TICHET_AUTH_JWT } from '../app.api';
import * as moment from 'moment';
import { Plugins } from 'protractor/built/plugins';
import { User } from '../components/auth/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class JwtService {
    username: string;
    password: string;
    formato: string = 'YYYYMMDDhhmmss';
    hask: string;

    constructor(private httpClient: HttpClient
        , private configService: ConfigService) {
        this.username = this.configService.userJwt;
        this.password = this.configService.passwordJwt;

    }

    login() {
        let Username = this.configService.userJwt;
        let Password = this.configService.passwordJwt;

        return this.httpClient.post(`${TICHET_AUTH_JWT}/login`, { Username, Password })
            .toPromise()
            .then((res) => {
                this.traitLogin(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    traitLogin(data) {
        var convertMinutes = Math.round((this.configService.expirationTokenSeconds) / 60);
        let token = sessionStorage.getItem(this.configService.userData);

        if (token) {
            if (this.validToken())
                return;
            else {
                var xpto = JSON.parse(token);
                xpto['_token'] = data['token']
                sessionStorage.setItem(this.configService.userData, JSON.stringify(xpto));
            }
        }
        else {
            var user = new User(''   //name
                , null               //idCadastro
                , ''                 //user
                , ''                 //email
                , null               //idTipoCliente
                , data['token']      //_token
                , this.configService.expirationTokenSeconds      //_expirationToken
                , moment(Date.now()).add(convertMinutes, 'minutes').format(this.formato)); //_expirationTokenDateHour
            sessionStorage.setItem(this.configService.userData, JSON.stringify(user));
        }
    }

    logout() {
        //   sessionStorage.removeItem(this.configService.access_token);
        return null;
    }

    validToken(): boolean {
        var token = sessionStorage.getItem(this.configService.userData);

        const tokenExpiration = JSON.parse(token)

        if (tokenExpiration['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato))
            return true;
        else {
            return false;
        }
    }

    getTokenExpirationDateHour() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['_expirationTokenDateHour'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['_expirationTokenDateHour'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['_expirationTokenDateHour'];
            }
            return token
        }
    }

    getTokenExpirationSeconds() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['_expirationToken'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['_expirationToken'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['_expirationToken'];
            }
            return token
        }
    }

    getToken() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));

        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['_token'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['_token'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['_token'];
            }
            return token
        }
    }

    getOptions() {
        var options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            }
        }
        return options;
    }

    getIdCadastro() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));

        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['idCadastro'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['idCadastro'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['idCadastro'];
            }
            return token
        }
    }

    getUsuario() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));

        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['user'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['user'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['user'];
            }
            return token
        }
    }

    getEmail() {
        let token;
        var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));

        if (!jwt) {
            this.login();
            var jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
            token = jwt['email'];
        }
        else {
            if (jwt['_expirationTokenDateHour'] > moment(Date.now()).format(this.formato)) {
                token = jwt['email'];
            }
            else {
                this.login();
                jwt = JSON.parse(sessionStorage.getItem(this.configService.userData));
                token = jwt['email'];
            }
            return token
        }
    }
}