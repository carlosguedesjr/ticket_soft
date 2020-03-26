import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './Config.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {

    constructor(private http: HttpClient, private router: Router, private configService: ConfigService) {}

    // Verifica o token obtido na url do usuário
    validPasswordToken(body): Observable<any> {
        setTimeout(() => {
            return true;
        }, 3000);
        return this.http.post<any>(`url/valid-password-token`, body);
    }

    // Gera o novo password
    newPassword(body): Observable<any> {
        return this.http.post(`url/new-password`, body);
    }

}