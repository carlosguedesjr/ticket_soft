import { TICKET_API_INGRESSOS } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './Jwt.service';

@Injectable({
    providedIn: 'root'
})

export class CategoryEventsService {

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    public getCategory() {
        
        var body = {
            'active': true
        }

        return this.http.post(`${TICKET_API_INGRESSOS}/IngressosCategoriasEvento/GetCategories`, body, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }
}
