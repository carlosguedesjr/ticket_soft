import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapRowService {

    constructor(
        private http: HttpClient
    ) { }

    getMapData(selectedModule) {
        return this.http.get(`https://reqres.in/api/users?page2`)
            .toPromise()
            .then((res: Response) => {
                return [
                        {
                            stateName: 'AC',
                            totalValue: '230'
                        },
                        {
                            stateName: 'AL',
                            totalValue: '230'
                        },
                        {
                            stateName: 'AM',
                            totalValue: '230'
                        },
                        {
                            stateName: 'AP',
                            totalValue: '230'
                        },
                        {
                            stateName: 'BA',
                            totalValue: '230'
                        },
                        {
                            stateName: 'CE',
                            totalValue: '230'
                        },
                        {
                            stateName: 'DF',
                            totalValue: '230'
                        },
                        {
                            stateName: 'ES',
                            totalValue: '230'
                        },
                        {
                            stateName: 'GO',
                            totalValue: '230'
                        },
                        {
                            stateName: 'MA',
                            totalValue: '230'
                        },
                        {
                            stateName: 'MG',
                            totalValue: '230'
                        },
                        {
                            stateName: 'MS',
                            totalValue: '230'
                        },
                        {
                            stateName: 'MT',
                            totalValue: '230'
                        },
                        {
                            stateName: 'PA',
                            totalValue: '230'
                        },
                        {
                            stateName: 'PB',
                            totalValue: '230'
                        },
                        {
                            stateName: 'PE',
                            totalValue: '230'
                        },
                        {
                            stateName: 'PI',
                            totalValue: '230'
                        },
                        {
                            stateName: 'PR',
                            totalValue: '230'
                        },
                        {
                            stateName: 'RJ',
                            totalValue: '230'
                        },
                        {
                            stateName: 'RN',
                            totalValue: '230'
                        },
                        {
                            stateName: 'RO',
                            totalValue: '230'
                        },
                        {
                            stateName: 'RR',
                            totalValue: '230'
                        },
                        {
                            stateName: 'RS',
                            totalValue: '230'
                        },
                        {
                            stateName: 'SC',
                            totalValue: '230'
                        },
                        {
                            stateName: 'SE',
                            totalValue: '230'
                        },
                        {
                            stateName: 'SP',
                            totalValue: '230'
                        },
                        {
                            stateName: 'TO',
                            totalValue: '230'
                        },
                    ];
            })
            .catch((error: Response) => error);
    }

    getStateData(state) {
        return this.http.get(`https://reqres.in/api/users?page2`)
            .toPromise()
            .then((res: Response) => {
                return {
                    stateName: 'SP',
                    emission: '20',
                    received: '30',
                    canceled: '40',
                    events: '50',
                };
            })
            .catch((error: Response) => error);
    }
}

