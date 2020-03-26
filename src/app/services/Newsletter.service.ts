import { HttpClient } from '@angular/common/http';
import { TICKET_API, TICKET_API_CLIENTES } from '../app.api';
import { Injectable } from '@angular/core';
import { JwtService } from './Jwt.service';

@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient,
        private jwtService: JwtService) { }

    public getStates() {
        return this.http.get(`${TICKET_API_CLIENTES}/Estados`,this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }
}