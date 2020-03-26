import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TICKET_API, TICKET_API_CLIENTES } from '../app.api';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Address } from '../interfaces/address';
import { catchError, tap } from 'rxjs/operators';
import { JwtService } from './Jwt.service';

@Injectable({
    providedIn: 'root',
})
export class CheckoutService {

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    public getAddresType() {
        return this.http.get(`${TICKET_API}/address_type`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getAddressesByUser(): Observable<any> {
        var body = {
            'idCadastro': this.jwtService.getIdCadastro()
        }

        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastroEndereco/GetByFilter`, body, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => {  })
            );
    }

    // MÉTODO PARA MANIPULAÇÃO DE ERROS EM REQUISIÇÕES HTTP
    private handleError(errorRes: HttpErrorResponse) {
        if (errorRes.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Um erro ocorreu:', errorRes.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend retornou o código ${errorRes.status}, ` +
                `o corpo foi: ${errorRes.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Alguma coisa aconteceu. Tente outra vez mais tarde.');
    }

}