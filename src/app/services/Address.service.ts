import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TICKET_API, TICKET_API_CLIENTES } from '../app.api';
import { Response } from '@angular/http';
import { JwtService } from './Jwt.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as moment from 'moment';
import { ConfigService } from './Config.service';

@Injectable()
export class AddressService {
    valueCep: any;
    constructor(
        private http: HttpClient
        , private jwtService: JwtService
        , private configService: ConfigService
    ) { }

    private viaCepUrl = 'https://viacep.com.br/ws';
    private method = 'json';

    public getAddressFromCep(cep: any) {
        this.valueCep = cep.replace('.', '').replace('-', '');
        
        return this.http.get(`${this.viaCepUrl}/${this.valueCep}/${this.method}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getStates(country: number) {
        var body = {
            'idPais': country
        }
        console.log('idPais', country);

        return this.http.post<any>(`${TICKET_API_CLIENTES}/Estados/GetByFilter`, body, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => console.log(error));
    }

    public getCitys(state: string) {
        var body =
        {
            'estado': state
        }
        return this.http.post(`${TICKET_API_CLIENTES}/Cidades/GetByFilter`, body, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => console.log(error));
    }

    public getTypeAddress() {
        return this.http.get(`${TICKET_API_CLIENTES}/ClienteTipoEndereco`, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => console.log(error));
    }

    public getCountries() {
        return this.http.get(`${TICKET_API_CLIENTES}/Pais`, this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => console.log(error));
    }

    public saveAddress(address) {
        let userCode = this.configService.userCode;
        var body =
        {
            'logradouro': address.address,
            'numero': address.number,
            'estado': address.state,
            'idCidade': address.city,
            'codigopais': address.country,
            'cep': address.postalcode,
            'bairro': address.neighborhood,
            'idTipoEndereco': address.type,
            'idCadastro': this.jwtService.getIdCadastro(),
            'idUsuarioInsercao': userCode,
            'idUsuarioAtualizacao': userCode,
        }
        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastroEndereco`,
            body, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError)
            );
    }

    public putAddress(address) {
        let userCode = this.configService.userCode;
        var body =
        {
            'idEndereco': address.address_id,
            'logradouro': address.address,
            'numero': address.number,
            'estado': address.state,
            'idCidade': address.city,
            'codigopais': address.country,
            'cep': address.postalcode,
            'bairro': address.neighborhood,
            'idTipoEndereco': address.type,
            'idCadastro': this.jwtService.getIdCadastro(),
            'idUsuarioAtualizacao': userCode,
        }

        return this.http.put<any>(`${TICKET_API_CLIENTES}/ClienteCadastroEndereco/` + address.address_id,
            body, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError)
            );
    }

    public deleteAddress(address_id) {
        return this.http.delete<any>(`${TICKET_API_CLIENTES}/ClienteCadastroEndereco/` + address_id,
            this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError)
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
