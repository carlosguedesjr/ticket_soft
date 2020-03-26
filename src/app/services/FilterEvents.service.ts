import { Injectable } from "@angular/core";
import { TICKET_API_INGRESSOS } from "../app.api";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/internal/operators";
import { JwtService } from "./Jwt.service";

@Injectable({
    providedIn: "root"
})

export class FilterEventsService {

    eventsBehavior = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    filters(category?: string, eventName?: string, startDate?: string, finishDate?: string, state?: string, city?: number): Observable<any> {
        var body = {
            'type_category': category ? category : null,
            'event': eventName ? eventName : null,
            'date_start': startDate ? startDate : null,
            'date_finish': finishDate ? finishDate : null,
            'state': state ? state : null,
            'city': city ? city : null
        }
        return this.http.post(
            `${TICKET_API_INGRESSOS}/IngressosEventos/GetEventsByFilter`, body,
            this.jwtService.getOptions())
            .pipe(
                tap(resData => {  })
            )
    }

    nextEvent(event){
        this.eventsBehavior.next(event);
    }

}
