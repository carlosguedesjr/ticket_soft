import { Injectable } from '@angular/core';
import { TICKET_API, TICKET_API_CLIENTES } from '../app.api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { JwtService } from './Jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class ContactService {

    constructor(private http: HttpClient, private jwtService: JwtService) { }

    public getAttributesContact() {
        return this.http.get(`${TICKET_API}/contactAttributes`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getUserContact(email: string){
        return this.http.get(`${TICKET_API}/user_contact?email=${email}`)
        .toPromise()
        .then((res: Response) => res)
        .catch((error: Response) => error);
    }


    public save(contact) {
        var body =
        {
            'tipoContato': contact.type,
            'email': contact.email,
            'telefone': contact.phone,
            'nome': contact.name
        }
        return this.http.post<any>(`${TICKET_API_CLIENTES}/*****`, 
                                                            body,
                                                            this.jwtService.getOptions())
        .pipe(
            catchError(this.handleError)
        );
    }
    


    private handleError(errorRes: HttpErrorResponse) {
       let errorMessage = 'Um erro desconhecido ocorreu!'
       if (!errorRes.status) {
           return throwError(errorMessage);
       }
       switch (errorRes.status) {
           case 401:
               errorMessage = "Seu acesso foi recusado aos servidores do portal, por favor faça se login e tente novamente."
               break;
           case 500:
               errorMessage = "Erro interno, estamos trabalhando para corrigir isso, tente em breve novamente."
               break;
           case 404:
               errorMessage = "comunição impossivel, caminho não encontrado"
               break;
       }
       return throwError(errorMessage);
   }
}