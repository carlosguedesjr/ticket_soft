import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentsMiniService {

    constructor(
        private http: HttpClient
    ) { }

    getModuleData(module: string) {
        return this.http.get(`https://reqres.in/api/users?page2`)
            .toPromise()
            .then((res: Response) => {
                // return res;
                return module === 'NFe' ? {
                    sent: {
                        quantity: 127,
                        value: 7599,
                        lastDate: new Date(),
                    },
                    received: {
                        quantity: 312,
                        value: 15800,
                        lastDate: new Date(),
                    },
                    canceled: {
                        quantity: 80,
                        value: 1238,
                        lastDate: new Date(),
                    },
                    event: {
                        quantity: 1842,
                        value: 129323,
                        lastDate: new Date(),
                    },
                } : {
                        sent: {
                            quantity: 100,
                            value: 8000,
                            lastDate: new Date(),
                        },
                        received: {
                            quantity: 300,
                            value: 14000,
                            lastDate: new Date(),
                        },
                        canceled: {
                            quantity: 500,
                            value: 6000,
                            lastDate: new Date(),
                        },
                        event: {
                            quantity: 1700,
                            value: 80000,
                            lastDate: new Date(),
                        },
                    }
                    ;
            })
            .catch((error: Response) => error);
    }

    getSelectedModule() {
        return this.http.get(`https://reqres.in/api/users?page2`)
            .toPromise()
            .then((res: Response) => {
                // return res;
                return {
                    module: 'NFe'
                };
            })
            .catch((error: Response) => error);
    }

    getModulesList() {
        return this.http.get(`https://reqres.in/api/users?page2`)
            .toPromise()
            .then((res: Response) => {
                // return res;
                return {
                    documents: ['nfe', 'cte', 'nfce', 'nfse', 'mdfe', 'gnre', 'ged'],
                };
            })
            .catch((error: Response) => error);
    }
}

