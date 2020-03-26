import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TICKET_API_MENSAGERIA } from '../app.api';
import { JwtService } from './Jwt.service';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators'
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    constructor(
        private http: HttpClient
        , private jwtService: JwtService) { }


    public postMessage(message, tpMensagem) {
        var body =
        {
            'idCadastro': this.jwtService.getIdCadastro(),
            'idEvento': message.event_id,
            'tipoMensagem': tpMensagem,
            'nomeCliente': message.name,
            'emailCliente': message.email,
            'assunto': message.subject,
            'mensagem': message.message,
            'estado': message.state
        }

        return this.http.post<any>(`${TICKET_API_MENSAGERIA}/Mensageria`,
            body,
            this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    console.log('newsletter: ', resData)
                })
            );
    }



    // MÉTODO PARA MANIPULAÇÃO DE ERROS EM REQUISIÇÕES HTTP
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
