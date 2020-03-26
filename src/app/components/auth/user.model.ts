import * as moment from 'moment';


export class User {
    formato: string = 'YYYYMMDDhhmmss';

    constructor(
        public name?: string,
        public idCadastro?: number,
        public user?: string,
        public email?: string,
        public idTipoCliente?: number,
        private _token?: string,
        private _expirationToken?: number,
        private _expirationTokenDateHour? : string
    ) {}

    get token() {
        // if (!this._expirationToken || this._expirationToken > moment(Date.now()).format(this.formato)){
        //     return null;
        // }
        return this._token;
    }

    get expirationToken() {
        return this._expirationToken;
    }
}