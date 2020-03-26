import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  subIdCompany = new Subject();
  wsReceita = 'https://www.receitaws.com.br/v1/cnpj';
  valueCnpj: any;

  constructor(
    private http: HttpClient) { }

  sendIdCompany(idCompany: number) {
    this.subIdCompany.next(idCompany);
    return true;
  }

  public getProfileReceita(cnpj: any)  {
    this.valueCnpj = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');
    console.log(this.valueCnpj);

    return this.http.get(`${this.wsReceita}/${this.valueCnpj}`)
      .toPromise()
      .then()
      .catch();
  }
}