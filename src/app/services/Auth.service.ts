import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from 'rxjs/internal/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../components/auth/user.model';
import { Router } from '@angular/router';
import { ConfigService } from './Config.service';
import { JwtService } from './Jwt.service';
import { TICKET_API_CLIENTES } from '../app.api';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router,
        private configService: ConfigService,
        private jwtService: JwtService) { }

    //  CADASTRO DE USUÁRIOS
    signup(name: string, email: string, cpf: string, gender: string, birthDate: string, password: string) {
        //1-PessoaFisica
        //2-PessoaJuridica
        var tpPessoa: number = 1;

        if (cpf.length > 11) {
            tpPessoa = 2;
        }

        let userCode = this.configService.userCode;

        //AJUSTAR
        var body =
        {
            'cpfCnpj': cpf,
            'nome': name,
            'idTipoCliente': tpPessoa,
            'email': email,
            'sexo': 'M',
            'dtNascimento': birthDate,
            'senha': password,
            'usuario': email,
            'idUsuarioInsercao': userCode,
            'idUsuarioAtualizacao': userCode,
        }

        console.log('body: ',body);
        
        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastro`,
            body,
            this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(name, this.jwtService.getIdCadastro(), this.jwtService.getUsuario(), this.jwtService.getEmail(), 1, this.jwtService.getToken(), this.jwtService.getTokenExpirationSeconds());
                })
            )
    }

    // USUÁRIO PERMANECE LOGADO MESMO DEPOIS DE ATUALIZAR A PÁGINA
    autoLogin() {
        const userData = JSON.parse(sessionStorage.getItem(this.configService.userData));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.name, userData.idCadastro, userData.user, userData.email, userData.idTipoCliente, userData._token, userData._expirationToken);
        if (loadedUser.token) {
            this.user.next(loadedUser);
            this.autoLogout(loadedUser.expirationToken * 1000);
        }
    }

    // LOGIN DE USUÁRIOS CADASTRADOS
    login(email: string, password: string) {
        var body = {
            usuario: email,
            senha: password,
        }

        return this.http.post<any>(`${TICKET_API_CLIENTES}/ClienteCadastro/GetByFilter`, body, this.jwtService.getOptions())
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.putToken(resData);
                    this.handleAuthentication(resData[0].nome, resData[0].idCadastro, resData[0].usuario, resData[0].email, resData[0].idTipoCliente, this.jwtService.getToken(), this.jwtService.getTokenExpirationSeconds());
                })
            )
    }

    // APÓS EXPIRAR O TOKEN, O USUÁRIO SERÁ DESLOGADO AUTOMATICAMENTE
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }


    logout() {
        this.user.next(null);
        sessionStorage.removeItem(this.configService.userData);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    // RECEBE OS DADOS OAUTH E ENVIA PARA A FUNÇÃO HANDLEAUTHENTICATION
    sendOauthData(email: string, userId: string, token: string, name: string, imageUrl: string) {
        //AJUSTAR
        //this.handleAuthentication(email, userId, token, name, imageUrl);
    }

    // RECEBE O REQUEST DE PASSWORD RESET
    requestReset(email: string) {
        return this.http.post<any>('url/resetPassword', {
            'email': email
        }).pipe(
            catchError(this.handleError)
        );
    }

    verifyIfEmailExists(email: string) {
        return this.http.post('url/checkmail', {
            newEmailCostumer: email
        }).pipe(
            catchError(this.handleError)
        );
    }

    private handleAuthentication(nome: string, idCadastro: number, userData: string, email: string, idTipoCliente: number, token: string, expirationToken: number) {
        const user = new User(nome, idCadastro, userData, email, idTipoCliente, token, expirationToken);
        this.user.next(user);
        this.autoLogout(expirationToken * 1000);
        sessionStorage.setItem(this.configService.userData, JSON.stringify(user));

    }

    // MÉTODO PARA MANIPULAÇÃO DE ERROS EM REQUISIÇÕES HTTP
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Um erro desconhecido ocorreu!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "Email já cadastrado"
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "E-mail não cadastrado"
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Senha incorreta!"
                break;
        }
        return throwError(errorMessage);
    }

    putToken(data) {
        var token = JSON.parse(sessionStorage.getItem(this.configService.userData));

        token.idCadastro = data[0].idCadastro ? data[0].idCadastro : null;
        token.usuario = data[0].usuario ? data[0].usuario : null;
        token.email = data[0].email ? data[0].email : null;
        token.idTipoCliente = data[0].idTipoCliente ? data[0].idTipoCliente : null;

        sessionStorage.setItem(this.configService.userData, JSON.stringify(token));
    }

}
