import { EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";
import { TICKET_API, TICKET_API_INGRESSOS } from "../app.api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/internal/operators";
import { FilterEvent } from "../interfaces/filterEvents";
import { JwtService } from "./Jwt.service";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  public events: any;
  public eventsBehavior = new BehaviorSubject(this.events);
  currentEvent = this.eventsBehavior.asObservable();
  subScription = new Subject();
  static toggleFilter = new EventEmitter<any>();


  constructor(private http: HttpClient, private jwtService: JwtService) { }

  clickToggleFilter(hiddenFilters: boolean) {
    EventsService.toggleFilter.emit(hiddenFilters);
  }

  public getEvents() {

    return this.http
      .get(
        `${TICKET_API_INGRESSOS}/IngressosEventos/GetEvents`,
        this.jwtService.getOptions()
      )
      .toPromise()
      .then((res: Response) => res)
      .catch((error: Response) => error);
  }

  public getEventsFeature() {

    return this.http

      .get(
        `${TICKET_API_INGRESSOS}/IngressosEventos/GetEvents?featured_events=true`,
        this.jwtService.getOptions()
      )
      .toPromise()
      .then()
      .catch();
  }

  public addEvents(item) {
    this.subScription.next(item);
  }

  public userAddFavoriteEvent(eventId): Observable<any> {
    return this.http.get(`${TICKET_API_INGRESSOS}/IngressosEventosFavoritos/PostOrDelete?IdEvento=${eventId}&IdUsuario=` + this.jwtService.getIdCadastro(),
      this.jwtService.getOptions()
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => { })
      );
  }

  public getFavoriteEvents() {
    return this.http.get(
      `${TICKET_API_INGRESSOS}/IngressosEventosFavoritos/GetEventsFavorites?user_id=${this.jwtService.getIdCadastro()}`,
      this.jwtService.getOptions()
    );
  }

  public getParticipatedEvents(): Observable<any> {

    return this.http.get(`${TICKET_API}/participated_events?email=` + this.jwtService.getEmail());
  }

  changeMessage(event) {
    this.eventsBehavior.next(event);
  }

  public getFilterEvent(filter: FilterEvent): Observable<any> {
    let url = null;

    filter.event ? (url = "?event_like=" + filter.event) : null;

    if (filter.event) filter.email ? (url += "&email=" + filter.email) : null;
    else filter.email ? (url = "?email=" + filter.email) : null;

    filter.quantityData
      ? (url += "&quantityData=" + filter.quantityData)
      : null;
    filter.page ? (url += "&page=" + filter.page) : null;
    filter.quantityPage
      ? (url += "&quantityPage=" + filter.quantityPage)
      : null;

    return this.http.get(`${TICKET_API}/participated_events${url}`);
  }

  // MÉTODO PARA MANIPULAÇÃO DE ERROS EM REQUISIÇÕES HTTP
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "Um erro desconhecido ocorreu!";
    if (!errorRes.status) {
      return throwError(errorMessage);
    }
    switch (errorRes.status) {
      case 401:
        errorMessage =
          "Seu acesso foi recusado aos servidores do portal, por favor faça se login e tente novamente.";
        break;
      case 500:
        errorMessage =
          "Erro interno, estamos trabalhando para corrigir isso, tente em breve novamente.";
        break;
      case 404:
        errorMessage = "comunição impossivel, caminho não encontrado";
        break;
    }
    return throwError(errorMessage);
  }
}
