import { HttpClient } from '@angular/common/http';
import { TICKET_API, TICKET_API_INGRESSOS } from '../app.api';
import { Injectable, EventEmitter } from '@angular/core';
import { JwtService } from './Jwt.service';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    public generateDynamicFG = new EventEmitter();

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    public getEvent(url: string) {
        return this.http.get(`${TICKET_API_INGRESSOS}/IngressosEventos/GetInternEvent?url=${url}`, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }
}
