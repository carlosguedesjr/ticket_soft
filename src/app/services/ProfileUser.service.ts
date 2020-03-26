import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TICKET_API, TICKET_API_CLIENTES } from '../app.api';
import { Injectable } from '@angular/core';
import { JwtService } from './Jwt.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ConfigService } from './Config.service';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

@Injectable({
    providedIn: 'root',
})
export class ProfileUserService {

    constructor(private http: HttpClient
        , private configService: ConfigService
        , private jwtService: JwtService) { }

    public getAddressesByUser(): Observable<any> {
        var body = {
            'idCadastro': this.jwtService.getIdCadastro()
        }

        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastroEndereco/GetByFilter`, body, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            );
    }


    public getUserInformation(): Observable<any> {

        return this.http.get(`${TICKET_API_CLIENTES}/ClienteCadastro/` + this.jwtService.getIdCadastro() + '?lazy=true', this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            )
    }

    public getClientType(): Observable<any> {
        return this.http.get(`${TICKET_API_CLIENTES}/ClienteTipoCliente`, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            )
    }

    public getPersonType(): Observable<any> {
        return this.http.get(`${TICKET_API_CLIENTES}/ClienteTipoPessoa`, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            )
    }

    public postPhone(phone) {
        var body =
        {
            'idTipoTelefone': phone.type,
            'numero': phone.phone,
            'idCadastro': this.jwtService.getIdCadastro()
        }
        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastroTelefone`, body
            , this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            );
    }

    public updatePhone(phone) {
        let userCode = this.configService.userCode;
        var body =
        {
            'idTelefone': phone.idTelefone,
            'idCadastro': this.jwtService.getIdCadastro(),
            'idTipoTelefone': phone.type,
            'numero': phone.phone
        }
        return this.http.put<any>(`${TICKET_API_CLIENTES}/ClienteCadastroTelefone/` + phone.idTelefone
            , body
            , this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            );
    }

    public deletePhone(address_id) {
        return this.http.delete<any>(`${TICKET_API_CLIENTES}/ClienteCadastroTelefone/` + address_id,
            this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError)
            );
    }
    public update(profile) {
        let userCode = this.configService.userCode;
        var body =
        {
            'nome': profile.name,
            'cpfCnpj': profile.document,
            'sexo': profile.gender,
            'dtNascimento': profile.birthday,
            'email': this.jwtService.getEmail(),
            'idTipoPessoa': userCode,
            'idTipoCliente': profile.clientType,
            'idCadastro': this.jwtService.getIdCadastro()
        }
        return this.http.put<any>(`${TICKET_API_CLIENTES}/ClienteCadastro/` + this.jwtService.getIdCadastro()
            , body
            , this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => { })
            );
    }

    public getPhoneTypes() {
        return this.http.get(`${TICKET_API_CLIENTES}/ClienteTipoTelefone`, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError)
            )
    }

    public getGenders() {
        return [{
            "type": "M",
            "description": "Masculino"
        }
            , {
            "type": "F",
            "description": "Feminino"
        }
            , {
            "type": "I",
            "description": "Indefinido"
        }
            , {
            "type": "NB",
            "description": "Não Binário"
        }];
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