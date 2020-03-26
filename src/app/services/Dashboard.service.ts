import { HttpClient } from '@angular/common/http';
import { TICKET_API } from '../app.api';
import { Injectable, EventEmitter } from '@angular/core';
import { talkOrganizer } from '../interfaces/talkOrganizer';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }


    public lstCanceledEvents(email: string){
        return this.http.get(`${TICKET_API}/canceled_events?email=${email}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public lstActiveEvents(email: string){
        return this.http.get(`${TICKET_API}/active_events?email=${email}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }


}
